import { Card } from './Card';

export interface PlayStrategy {
  play(player1: Card, player2: Card): { winner: string, detail: any };
} 