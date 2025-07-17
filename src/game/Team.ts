import { Player } from './Player';

export class Team {
  id: string;
  members: Player[] = [];

  constructor(id: string) {
    this.id = id;
  }

  addPlayer(player: Player) {
    this.members.push(player);
  }
} 