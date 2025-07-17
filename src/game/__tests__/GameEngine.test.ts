import { GameEngine } from '../GameEngine';
import { Rank, Suit, Card } from '../Card';

describe('GameEngine', () => {
  it('initializes and deals hands', () => {
    const engine = new GameEngine(['p1', 'p2']);
    expect(engine.game.players.length).toBe(2);
    engine.game.players.forEach(p => {
      expect(p.hand.length).toBe(3);
    });
  });

  it('rotates dealer and resets hand', () => {
    const engine = new GameEngine(['p1', 'p2']);
    const firstDealer = engine.dealerIndex;
    engine.startHand();
    expect(engine.dealerIndex).toBe((firstDealer + 1) % 2);
    engine.game.players.forEach(p => {
      expect(p.hand.length).toBe(3);
    });
  });

  it('turn management works', () => {
    const engine = new GameEngine(['p1', 'p2']);
    expect(engine.getCurrentPlayer().id).toBe('p1');
    engine.nextTurn();
    expect(engine.getCurrentPlayer().id).toBe('p2');
    engine.nextTurn();
    expect(engine.getCurrentPlayer().id).toBe('p1');
  });
});

describe('Envido flow', () => {
  it('permite cantar envido solo si no hay envido activo', () => {
    const engine = new GameEngine(['p1', 'p2']);
    expect(engine.canCallEnvido()).toBe(true);
    engine.callEnvido();
    expect(engine.canCallEnvido()).toBe(false);
  });

  it('aceptar envido suma puntos al ganador', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callEnvido();
    // Forzamos manos para controlar el resultado
    engine.game.players[0].setHand([
      new Card(Rank.SEVEN, Suit.SPADES),
      new Card(Rank.SEVEN, Suit.SPADES),
      new Card(Rank.ONE, Suit.CLUBS),
    ]);
    engine.game.players[1].setHand([
      new Card(Rank.FIVE, Suit.SPADES),
      new Card(Rank.FOUR, Suit.SPADES),
      new Card(Rank.ONE, Suit.CLUBS),
    ]);
    engine.acceptEnvido();
    // El primer jugador tiene 7+7+20=34, el segundo 5+4+20=29
    expect(engine.game.score.get(engine.game.players[0].team)).toBe(2);
  });

  it('rechazar envido suma 1 punto al que cantó', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callEnvido();
    engine.rejectEnvido();
    expect(engine.game.score.get(engine.game.players[0].team)).toBe(1);
  });
});

describe('Truco flow', () => {
  it('permite cantar truco solo si no hay truco activo', () => {
    const engine = new GameEngine(['p1', 'p2']);
    expect(engine.canCallTruco()).toBe(true);
    engine.callTruco();
    expect(engine.canCallTruco()).toBe(false);
  });

  it('permite cantar retruco solo después de truco', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callTruco();
    expect(engine.canCallRetruco()).toBe(true);
    engine.callRetruco();
    expect(engine.canCallRetruco()).toBe(false);
  });

  it('permite cantar vale cuatro solo después de retruco', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callTruco();
    engine.callRetruco();
    expect(engine.canCallValeCuatro()).toBe(true);
    engine.callValeCuatro();
    expect(engine.canCallValeCuatro()).toBe(false);
  });

  it('aceptar truco suma puntos correctos según etapa', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callTruco();
    engine.acceptTruco();
    expect(engine.game.score.get(engine.game.players[0].team)).toBe(2);

    engine.callTruco();
    engine.callRetruco();
    engine.acceptTruco();
    expect(engine.game.score.get(engine.game.players[0].team)).toBe(5); // 2 + 3

    engine.callTruco();
    engine.callRetruco();
    engine.callValeCuatro();
    engine.acceptTruco();
    expect(engine.game.score.get(engine.game.players[0].team)).toBe(9); // 2 + 3 + 4
  });

  it('rechazar truco suma 1 punto al que cantó', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callTruco();
    engine.rejectTruco();
    expect(engine.game.score.get(engine.game.players[0].team)).toBe(1);
  });

  it('no permite cantar truco dos veces seguidas', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callTruco();
    expect(() => engine.callTruco()).toThrow();
  });

  it('no permite cantar retruco sin truco', () => {
    const engine = new GameEngine(['p1', 'p2']);
    expect(() => engine.callRetruco()).toThrow();
  });

  it('no permite cantar vale cuatro sin retruco', () => {
    const engine = new GameEngine(['p1', 'p2']);
    engine.callTruco();
    expect(() => engine.callValeCuatro()).toThrow();
  });
}); 