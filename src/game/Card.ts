export enum Suit {
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  GOLDS = 'GOLDS',
  CUPS = 'CUPS',
}

export enum Rank {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
}

export class Card {
  readonly suit: Suit;
  readonly rank: Rank;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  fullName(): string {
    return `${this.rank} of ${this.suit}`;
  }

  // Truco Argentino hierarchy
  static trucoOrder(card: Card): number {
    if (card.rank === Rank.ONE && card.suit === Suit.SPADES) return 14;
    if (card.rank === Rank.ONE && card.suit === Suit.CLUBS) return 13;
    if (card.rank === Rank.SEVEN && card.suit === Suit.SPADES) return 12;
    if (card.rank === Rank.SEVEN && card.suit === Suit.GOLDS) return 11;
    if (card.rank === Rank.THREE) return 10;
    if (card.rank === Rank.TWO) return 9;
    if (card.rank === Rank.ONE && (card.suit === Suit.CUPS || card.suit === Suit.GOLDS)) return 8;
    if ([Rank.TWELVE, Rank.ELEVEN, Rank.TEN].includes(card.rank)) return 7;
    if (card.rank === Rank.SEVEN && (card.suit === Suit.CUPS || card.suit === Suit.CLUBS)) return 6;
    if (card.rank === Rank.SIX) return 5;
    if (card.rank === Rank.FIVE) return 4;
    if (card.rank === Rank.FOUR) return 3;
    return 0;
  }

  static envidoValue(card: Card): number {
    if ([Rank.TEN, Rank.ELEVEN, Rank.TWELVE].includes(card.rank)) return 0;
    return card.rank;
  }
} 