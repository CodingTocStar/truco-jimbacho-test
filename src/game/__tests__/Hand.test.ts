import { Hand } from '../Hand';
import { Player } from '../Player';
import { Team } from '../Team';
import { Card, Rank, Suit } from '../Card';

describe('Hand', () => {
  const team = new Team('A');
  const p1 = new Player('p1', team);
  const p2 = new Player('p2', team);
  const hand = new Hand([p1, p2]);
  const c1 = new Card(Rank.THREE, Suit.CLUBS);
  const c2 = new Card(Rank.ONE, Suit.SPADES);

  it('adds plays and clears', () => {
    hand.addPlay(p1, c1);
    hand.addPlay(p2, c2);
    expect(hand.played_cards.length).toBe(2);
    hand.clearPlays();
    expect(hand.played_cards.length).toBe(0);
  });

  it('adds wins', () => {
    hand.addWin(p1);
    hand.addWin(p1);
    hand.addWin(p2);
    expect(hand.getWins(p1)).toBe(2);
    expect(hand.getWins(p2)).toBe(1);
  });
}); 