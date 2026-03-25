import type { Command } from "./Command";
import { player } from "../Player";

export class NextCommand implements Command {
  execute(): void {
    player.next();
  }
}
