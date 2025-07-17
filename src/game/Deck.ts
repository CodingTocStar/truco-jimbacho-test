import { Card, Rank, Suit } from './Card';

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    const ranks = [
      Rank.ONE, Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX, Rank.SEVEN, Rank.TEN, Rank.ELEVEN, Rank.TWELVE
    ];
    const suits = [Suit.SPADES, Suit.CLUBS, Suit.GOLDS, Suit.CUPS];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(numPlayers: number, cardsPerPlayer: number): Card[][] {
    if (numPlayers * cardsPerPlayer > this.cards.length) {
      throw new Error('No hay suficientes cartas para repartir');
    }
    this.shuffle();
    const hands: Card[][] = [];
    for (let i = 0; i < numPlayers; i++) {
      hands.push(this.cards.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer));
    }
    this.cards = this.cards.slice(numPlayers * cardsPerPlayer);
    return hands;
  }
} 