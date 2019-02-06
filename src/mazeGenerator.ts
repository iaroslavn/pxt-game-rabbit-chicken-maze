import { Percolation } from './percolation';

/**
 * Maze Generator
 */
export class MazeGenerator {
  public static generateMaze(N: number): boolean[][] {
    const perc = new Percolation(N);
    while (!perc.percolates()) {
      const row = MazeGenerator.random(1, perc.N);
      const col = MazeGenerator.random(1, perc.N);
      perc.open(row, col);
    }
    const maze = this.getMap(perc);
    return maze;
  }

  private static random(low: number, hi: number): number {
    return Math.floor(Math.random() * (hi - low + 1)) + low;
  }

  private static getMap(perc: Percolation): boolean[][] {
    const result: boolean[][] = [];
    for (let row = 1; row <= perc.N; row++) {
      result[row - 1] = [];
      for (let col = 1; col <= perc.N; col++) {
        result[row - 1][col - 1] = perc.isOpen(row, col);
      }
    }
    return result;
  }
}
