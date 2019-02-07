/**
 * Utility class for matrix operations.
 */
export class Matrix {
  /**
   * Rotates a square matrix counterclockwise in-place.
   * @param arr A square matrix.
   */
  public static rotateCCW(arr: any[][]): void {
    for (let i = 0; i < arr.length / 2; i++) {
      for (let j = i; j < arr.length - 1 - i; j++) {
        const temp = arr[i][j];
        arr[i][j] = arr[j][arr.length - 1 - i];
        arr[j][arr.length - 1 - i] = arr[arr.length - 1 - i][arr.length - 1 - j];
        arr[arr.length - 1 - i][arr.length - 1 - j] = arr[arr.length - 1 - j][i];
        arr[arr.length - 1 - j][i] = temp;
      }
    }
  }

  /**
   * Returns a string that contains all elements of an array separated by the specified column and row separator
   * strings.
   * @param arr A two-dimensional array.
   * @param colSeparator A string used to separate one element of an array from the next in the resulting String
   * in the same row. If omitted, the array elements are separated with a tab.
   * @param rowSeparator A string used to separate one row of a two-dimensional array from another.
   * If omitted, the array rows are separated with a LF character.
   */
  public static toString(arr: any[][], colSeparator: string = '\t', rowSeparator: string = '\n'): string {
    let res = '';

    arr.forEach(subArr => {
      res += res.length > 0 ? rowSeparator : '';
      res += subArr.join(colSeparator);
    });

    return res;
  }
}
