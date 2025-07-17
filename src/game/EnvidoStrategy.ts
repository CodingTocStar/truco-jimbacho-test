import { PlayStrategy } from './PlayStrategy';
import { Card } from './Card';

function envidoValue(card: Card): number {
  return Card.envidoValue(card);
}

export class EnvidoStrategy implements PlayStrategy {
  play(player1: Card, player2: Card): { winner: string, detail: any } {
    const envido1 = envidoValue(player1);
    const envido2 = envidoValue(player2);
    if (envido1 > envido2) return { winner: 'player1', detail: { envido1, envido2 } };
    if (envido1 < envido2) return { winner: 'player2', detail: { envido1, envido2 } };
    return { winner: 'draw', detail: { envido1, envido2 } };
  }
} 