import { TrucoState, EnvidoStage, TrucoStage } from '../TrucoState';
import { Hand } from '../Hand';
import { Player } from '../Player';
import { Team } from '../Team';

describe('TrucoState', () => {
  const team = new Team('A');
  const p1 = new Player('p1', team);
  const p2 = new Player('p2', team);
  const hand = new Hand([p1, p2]);

  it('inicializa correctamente', () => {
    const state = new TrucoState(hand);
    expect(state.envido_stage).toBe(EnvidoStage.NONE);
    expect(state.truco_stage).toBe(TrucoStage.NONE);
    expect(state.current_hand).toBe(hand);
    expect(state.turn_index).toBe(0);
  });

  it('cambia de estado', () => {
    const state = new TrucoState(hand);
    state.envido_stage = EnvidoStage.ENVIDO;
    state.truco_stage = TrucoStage.RETRUCO;
    state.turn_index = 1;
    expect(state.envido_stage).toBe(EnvidoStage.ENVIDO);
    expect(state.truco_stage).toBe(TrucoStage.RETRUCO);
    expect(state.turn_index).toBe(1);
  });
}); 