import { Player } from '../Player';
import { Team } from '../Team';
import { Card, Rank, Suit } from '../Card';

describe('Player and Team', () => {
  it('creates a team and adds players', () => {
    const team = new Team('A');
    const p1 = new Player('p1', team);
    const p2 = new Player('p2', team);
    team.addPlayer(p1);
    team.addPlayer(p2);
    expect(team.members.length).toBe(2);
    expect(team.members[0].id).toBe('p1');
  });

  it('assigns hand to a player', () => {
    const team = new Team('A');
    const p = new Player('p1', team);
    const hand = [new Card(Rank.THREE, Suit.CLUBS), new Card(Rank.ONE, Suit.SPADES), new Card(Rank.TWELVE, Suit.CUPS)];
    p.setHand(hand);
    expect(p.hand.length).toBe(3);
    expect(p.hand[0].fullName()).toBe('3 of CLUBS');
  });
}); 