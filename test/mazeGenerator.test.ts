import { Matrix } from '../src/matrix';
import { MazeGenerator } from '../src/mazeGenerator';

describe('Maze Generator test', () => {
  it('should return solvable 4 cell maze', () => {
    const result = MazeGenerator.generateMaze(2);
    Matrix.rotateCCW(result);
    expect(result).toContainEqual([true, true]);
  });
});
