import { Matrix } from '../src/matrix';

describe('Matrix utils test', () => {
  it('should correctly rotate matrix counterclockwise', () => {
    // prettier-ignore
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    Matrix.rotateCCW(arr);

    // prettier-ignore
    expect(arr).toEqual([
      [2, 5, 8],
      [1, 4, 7],
      [0, 3, 6]
    ]);
  });

  it('should return the input matrix if it is rotated counterclockwise 4 times', () => {
    // prettier-ignore
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    Matrix.rotateCCW(arr);
    Matrix.rotateCCW(arr);
    Matrix.rotateCCW(arr);
    Matrix.rotateCCW(arr);

    // prettier-ignore
    expect(arr).toEqual([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]);
  });

  it('shoud return string with default column and line delimiters', () => {
    // prettier-ignore
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    const result = Matrix.toString(arr);

    expect(result).toBe('0\t1\t2\n3\t4\t5\n6\t7\t8');
  });

  it('shoud return string with the specified column delimiter and a default line delimiter', () => {
    // prettier-ignore
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    const result = Matrix.toString(arr, ', ');

    expect(result).toBe('0, 1, 2\n3, 4, 5\n6, 7, 8');
  });

  it('shoud return string with the specified column and line delimiter', () => {
    // prettier-ignore
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    const result = Matrix.toString(arr, '-', '|');

    expect(result).toBe('0-1-2|3-4-5|6-7-8');
  });
});
