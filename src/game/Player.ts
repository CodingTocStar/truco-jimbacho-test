import { Card } from './Card';
import { Team } from './Team';

export class Player {
  id: string;
  hand: Card[] = [];
  team: Team;

  constructor(id: string, team: Team) {
    this.id = id;
    this.team = team;
  }

  setHand(hand: Card[]) {
    this.hand = hand;
  }
} 