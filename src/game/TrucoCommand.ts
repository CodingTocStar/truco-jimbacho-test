import { PlayCommand } from './PlayCommand';
import { PlayStrategy } from './PlayStrategy';
import { Card } from './Card';

export class TrucoCommand implements PlayCommand {
  private strategy: PlayStrategy;
  constructor(strategy: PlayStrategy) {
    this.strategy = strategy;
  }
  execute(player1: Card, player2: Card) {
    return this.strategy.play(player1, player2);
  }
} 