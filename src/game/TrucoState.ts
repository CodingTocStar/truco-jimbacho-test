import { Hand } from './Hand';

export enum EnvidoStage {
  NONE = 'NONE',
  ENVIDO = 'ENVIDO',
  REAL_ENVIDO = 'REAL_ENVIDO',
  FALTA_ENVIDO = 'FALTA_ENVIDO',
}

export enum TrucoStage {
  NONE = 'NONE',
  TRUCO = 'TRUCO',
  RETRUCO = 'RETRUCO',
  VALE_CUATRO = 'VALE_CUATRO',
}

export class TrucoState {
  envido_stage: EnvidoStage = EnvidoStage.NONE;
  truco_stage: TrucoStage = TrucoStage.NONE;
  current_hand: Hand;
  turn_index: number = 0;

  constructor(hand: Hand) {
    this.current_hand = hand;
  }
} 