import { Card } from './Card';

export interface PlayCommand {
  execute(player1: Card, player2: Card): { winner: string, detail: any };
} 