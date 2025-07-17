import { Game } from '../Game';
import { Player } from '../Player';
import { Team } from '../Team';
import { Deck } from '../Deck';
import { TrucoState } from '../TrucoState';
import { Hand } from '../Hand';

describe('Game', () => {
  it('crea un juego con jugadores, equipos, mazo y estado', () => {
    const teamA = new Team('A');
    const teamB = new Team('B');
    const p1 = new Player('p1', teamA);
    const p2 = new Player('p2', teamB);
    teamA.addPlayer(p1);
    teamB.addPlayer(p2);
    const deck = new Deck();
    const hand = new Hand([p1, p2]);
    const trucoState = new TrucoState(hand);
    const game = new Game([p1, p2], [teamA, teamB], deck, trucoState);
    expect(game.players.length).toBe(2);
    expect(game.teams.length).toBe(2);
    expect(game.deck.cards.length).toBe(40);
    expect(game.score.get(teamA)).toBe(0);
    expect(game.trucoState).toBe(trucoState);
  });
}); 