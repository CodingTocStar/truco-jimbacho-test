import { Game } from './Game';
import { Player } from './Player';
import { Team } from './Team';
import { Deck } from './Deck';
import { Hand } from './Hand';
import { TrucoState, EnvidoStage, TrucoStage } from './TrucoState';

export class GameEngine {
  game: Game;
  dealerIndex: number = 0;

  constructor(playerIds: string[]) {
    // For now, 2 players, 2 teams
    const teamA = new Team('A');
    const teamB = new Team('B');
    const players: Player[] = [];
    playerIds.forEach((id, i) => {
      const team = i % 2 === 0 ? teamA : teamB;
      const player = new Player(id, team);
      team.addPlayer(player);
      players.push(player);
    });
    const teams = [teamA, teamB];
    const deck = new Deck();
    const hand = new Hand(players);
    const trucoState = new TrucoState(hand);
    this.game = new Game(players, teams, deck, trucoState);
    this.startHand();
  }

  startHand() {
    this.game.deck.reset();
    this.game.deck.shuffle();
    // Deal 3 cards to each player
    const hands = this.game.deck.deal(this.game.players.length, 3);
    this.game.players.forEach((p, i) => p.setHand(hands[i]));
    // Reset hand state
    this.game.trucoState = new TrucoState(new Hand(this.game.players));
    this.dealerIndex = (this.dealerIndex + 1) % this.game.players.length;
  }

  getCurrentPlayer(): Player {
    return this.game.players[this.game.trucoState.turn_index];
  }

  nextTurn() {
    this.game.trucoState.turn_index = (this.game.trucoState.turn_index + 1) % this.game.players.length;
  }

  // ENVIDO LOGIC
  canCallEnvido(): boolean {
    return this.game.trucoState.envido_stage === EnvidoStage.NONE;
  }

  callEnvido(stage: EnvidoStage = EnvidoStage.ENVIDO) {
    if (!this.canCallEnvido()) throw new Error('No se puede cantar envido ahora');
    this.game.trucoState.envido_stage = stage;
    // Aquí podrías guardar quién cantó envido, para saber quién responde
  }

  acceptEnvido() {
    if (this.game.trucoState.envido_stage === EnvidoStage.NONE) throw new Error('No hay envido para aceptar');
    this.resolveEnvido();
    this.game.trucoState.envido_stage = EnvidoStage.NONE;
  }

  rejectEnvido() {
    if (this.game.trucoState.envido_stage === EnvidoStage.NONE) throw new Error('No hay envido para rechazar');
    // El equipo que cantó envido suma 1 punto
    // Suponemos que el primer jugador es quien cantó envido
    const caller = this.game.players[this.game.trucoState.turn_index];
    this.game.score.set(caller.team, (this.game.score.get(caller.team) || 0) + 1);
    this.game.trucoState.envido_stage = EnvidoStage.NONE;
  }

  resolveEnvido() {
    // Calcula el envido de cada equipo y suma los puntos al ganador
    const teamEnvidos = this.game.teams.map(team => {
      // Para cada equipo, calcula el mejor envido de sus jugadores
      return Math.max(...team.members.map(p => this.calculateEnvido(p.hand)));
    });
    let winnerTeamIdx = 0;
    if (teamEnvidos[1] > teamEnvidos[0]) winnerTeamIdx = 1;
    // Empate: gana el mano (primer jugador)
    const points = this.getEnvidoPoints(this.game.trucoState.envido_stage);
    this.game.score.set(this.game.teams[winnerTeamIdx], (this.game.score.get(this.game.teams[winnerTeamIdx]) || 0) + points);
  }

  calculateEnvido(hand: import('./Card').Card[]): number {
    // Calcula el envido de una mano (máximo de dos cartas del mismo palo, suma valores, +20)
    let max = 0;
    for (let i = 0; i < hand.length; i++) {
      for (let j = i + 1; j < hand.length; j++) {
        if (hand[i].suit === hand[j].suit) {
          const val = (hand[i].rank > 9 ? 0 : hand[i].rank) + (hand[j].rank > 9 ? 0 : hand[j].rank) + 20;
          if (val > max) max = val;
        }
      }
    }
    // Si no hay dos del mismo palo, el mayor valor de una sola carta
    if (max === 0) max = Math.max(...hand.map(c => (c.rank > 9 ? 0 : c.rank)));
    return max;
  }

  getEnvidoPoints(stage: EnvidoStage): number {
    switch (stage) {
      case EnvidoStage.ENVIDO: return 2;
      case EnvidoStage.REAL_ENVIDO: return 3;
      case EnvidoStage.FALTA_ENVIDO: return 30; // O puntos para ganar
      default: return 0;
    }
  }

  // TRUCO LOGIC
  canCallTruco(): boolean {
    return this.game.trucoState.truco_stage === TrucoStage.NONE;
  }

  callTruco() {
    if (!this.canCallTruco()) throw new Error('No se puede cantar truco ahora');
    this.game.trucoState.truco_stage = TrucoStage.TRUCO;
  }

  canCallRetruco(): boolean {
    return this.game.trucoState.truco_stage === TrucoStage.TRUCO;
  }

  callRetruco() {
    if (!this.canCallRetruco()) throw new Error('No se puede cantar retruco ahora');
    this.game.trucoState.truco_stage = TrucoStage.RETRUCO;
  }

  canCallValeCuatro(): boolean {
    return this.game.trucoState.truco_stage === TrucoStage.RETRUCO;
  }

  callValeCuatro() {
    if (!this.canCallValeCuatro()) throw new Error('No se puede cantar vale cuatro ahora');
    this.game.trucoState.truco_stage = TrucoStage.VALE_CUATRO;
  }

  acceptTruco() {
    if (this.game.trucoState.truco_stage === TrucoStage.NONE) throw new Error('No hay truco para aceptar');
    this.resolveTruco();
    this.game.trucoState.truco_stage = TrucoStage.NONE;
  }

  rejectTruco() {
    if (this.game.trucoState.truco_stage === TrucoStage.NONE) throw new Error('No hay truco para rechazar');
    // El equipo que cantó la última apuesta suma 1 punto
    const caller = this.game.players[this.game.trucoState.turn_index];
    this.game.score.set(caller.team, (this.game.score.get(caller.team) || 0) + 1);
    this.game.trucoState.truco_stage = TrucoStage.NONE;
  }

  resolveTruco() {
    // Aquí deberías resolver la mano y sumar los puntos al equipo ganador
    // Por simplicidad, sumamos los puntos al equipo del primer jugador
    const points = this.getTrucoPoints(this.game.trucoState.truco_stage);
    const winnerTeam = this.game.players[0].team;
    this.game.score.set(winnerTeam, (this.game.score.get(winnerTeam) || 0) + points);
  }

  getTrucoPoints(stage: TrucoStage): number {
    switch (stage) {
      case TrucoStage.TRUCO: return 2;
      case TrucoStage.RETRUCO: return 3;
      case TrucoStage.VALE_CUATRO: return 4;
      default: return 0;
    }
  }

  // More methods for envido, truco, play card, etc. will be added here
} 