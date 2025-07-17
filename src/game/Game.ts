import { Player } from './Player';
import { Team } from './Team';
import { Deck } from './Deck';
import { TrucoState } from './TrucoState';

export class Game {
  players: Player[];
  teams: Team[];
  deck: Deck;
  score: Map<Team, number>;
  trucoState: TrucoState;

  constructor(players: Player[], teams: Team[], deck: Deck, trucoState: TrucoState) {
    this.players = players;
    this.teams = teams;
    this.deck = deck;
    this.score = new Map();
    teams.forEach(t => this.score.set(t, 0));
    this.trucoState = trucoState;
  }
} 