import type { Command } from "./Command";
import { player } from "../Player";

export class PreviousCommand implements Command {
  execute(): void {
    player.previous();
  }
}
