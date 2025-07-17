import { Deck } from '../Deck';
import { Card } from '../Card';

describe('Deck', () => {
  it('creates a deck of 40 cards', () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(40);
  });

  it('reset returns to 40 cards', () => {
    const deck = new Deck();
    deck.deal(2, 3);
    deck.reset();
    expect(deck.cards.length).toBe(40);
  });

  it('deal deals correctly', () => {
    const deck = new Deck();
    const hands = deck.deal(4, 3);
    expect(hands.length).toBe(4);
    hands.forEach(hand => expect(hand.length).toBe(3));
    // No repeated cards
    const all = hands.flat().map(c => c.fullName());
    const set = new Set(all);
    expect(set.size).toBe(12);
  });

  it('throws if not enough cards', () => {
    const deck = new Deck();
    expect(() => deck.deal(14, 3)).toThrow();
  });
}); 