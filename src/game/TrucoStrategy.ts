import { PlayStrategy } from './PlayStrategy';
import { Card } from './Card';

export class TrucoStrategy implements PlayStrategy {
  play(player1: Card, player2: Card): { winner: string, detail: any } {
    const result = Card.trucoOrder(player1) - Card.trucoOrder(player2);
    if (result > 0) return { winner: 'player1', detail: { player1: player1.fullName(), player2: player2.fullName() } };
    if (result < 0) return { winner: 'player2', detail: { player1: player1.fullName(), player2: player2.fullName() } };
    return { winner: 'draw', detail: { player1: player1.fullName(), player2: player2.fullName() } };
  }
} 