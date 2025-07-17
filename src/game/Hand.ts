import { Card } from './Card';
import { Player } from './Player';

export class Hand {
  played_cards: Array<{ player: Player; card: Card }> = [];
  wins: Map<Player, number> = new Map();

  constructor(players: Player[]) {
    players.forEach(p => this.wins.set(p, 0));
  }

  addPlay(player: Player, card: Card) {
    this.played_cards.push({ player, card });
  }

  clearPlays() {
    this.played_cards = [];
  }

  addWin(player: Player) {
    this.wins.set(player, (this.wins.get(player) || 0) + 1);
  }

  getWins(player: Player): number {
    return this.wins.get(player) || 0;
  }
} 