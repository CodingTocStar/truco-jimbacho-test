import { Card, Rank, Suit } from '../Card';

describe('Card', () => {
  it('creates a card correctly', () => {
    const c = new Card(Rank.THREE, Suit.CLUBS);
    expect(c.rank).toBe(Rank.THREE);
    expect(c.suit).toBe(Suit.CLUBS);
    expect(c.fullName()).toBe('3 of CLUBS');
  });

  it('truco hierarchy is correct', () => {
    expect(Card.trucoOrder(new Card(Rank.ONE, Suit.SPADES))).toBe(14);
    expect(Card.trucoOrder(new Card(Rank.ONE, Suit.CLUBS))).toBe(13);
    expect(Card.trucoOrder(new Card(Rank.SEVEN, Suit.SPADES))).toBe(12);
    expect(Card.trucoOrder(new Card(Rank.SEVEN, Suit.GOLDS))).toBe(11);
    expect(Card.trucoOrder(new Card(Rank.THREE, Suit.CUPS))).toBe(10);
    expect(Card.trucoOrder(new Card(Rank.TWO, Suit.CLUBS))).toBe(9);
    expect(Card.trucoOrder(new Card(Rank.ONE, Suit.CUPS))).toBe(8);
    expect(Card.trucoOrder(new Card(Rank.TWELVE, Suit.CLUBS))).toBe(7);
    expect(Card.trucoOrder(new Card(Rank.SEVEN, Suit.CLUBS))).toBe(6);
    expect(Card.trucoOrder(new Card(Rank.SIX, Suit.CLUBS))).toBe(5);
    expect(Card.trucoOrder(new Card(Rank.FIVE, Suit.CLUBS))).toBe(4);
    expect(Card.trucoOrder(new Card(Rank.FOUR, Suit.CLUBS))).toBe(3);
  });

  it('envido value is correct', () => {
    expect(Card.envidoValue(new Card(Rank.THREE, Suit.CLUBS))).toBe(3);
    expect(Card.envidoValue(new Card(Rank.TWELVE, Suit.CLUBS))).toBe(0);
    expect(Card.envidoValue(new Card(Rank.ELEVEN, Suit.CLUBS))).toBe(0);
    expect(Card.envidoValue(new Card(Rank.TEN, Suit.CLUBS))).toBe(0);
    expect(Card.envidoValue(new Card(Rank.SEVEN, Suit.CLUBS))).toBe(7);
  });
}); 