import { WeightedQuickUnionUF } from './weightedQuickUnionUF';

/**
 * Represents a system as an N-by-N grid of sites.
 * The system percolates only when there is a path between top and bottom rows of the grid.
 */
export class Percolation {
  private startPointIndex: number;
  private endPointIndex: number;

  private id: number[];
  private opened: boolean[];

  private weightedQuickUnionUF: WeightedQuickUnionUF;
  private n: number;

  /**
   * Creates N-by-N grid, with all sites blocked.
   * @param N amount of rows and columns in the grid.
   */
  constructor(N: number) {
    const totalPointsCount = N * N + 2;
    this.n = N;
    this.startPointIndex = 0;
    this.endPointIndex = totalPointsCount - 1;
    this.weightedQuickUnionUF = new WeightedQuickUnionUF(totalPointsCount);

    this.id = [];
    for (let i = 0; i < totalPointsCount; i++) {
      this.id.push(i);
    }

    this.opened = [];
    for (let i = 0; i < totalPointsCount; i++) {
      this.opened.push(false);
    }
    this.opened[this.startPointIndex] = true;
    this.opened[this.endPointIndex] = true;
  }

  /**
   * Opens site (row i, column j) if it is not already.
   * @param i row index.
   * @param j column index.
   */
  public open(i: number, j: number): void {
    if (this.isOpen(i, j)) {
      return;
    }
    this.opened[this.convert2Dto1D(i, j)] = true;

    if (j > 1 && this.isOpen(i, j - 1)) {
      this.weightedQuickUnionUF.union(this.convert2Dto1D(i, j), this.convert2Dto1D(i, j - 1));
    }

    if (j < this.N && this.isOpen(i, j + 1)) {
      this.weightedQuickUnionUF.union(this.convert2Dto1D(i, j), this.convert2Dto1D(i, j + 1));
    }

    if (i > 1) {
      if (this.isOpen(i - 1, j)) {
        this.weightedQuickUnionUF.union(this.convert2Dto1D(i, j), this.convert2Dto1D(i - 1, j));
      }
    } else {
      this.weightedQuickUnionUF.union(this.convert2Dto1D(i, j), this.startPointIndex);
    }

    if (i < this.N) {
      if (this.isOpen(i + 1, j)) {
        this.weightedQuickUnionUF.union(this.convert2Dto1D(i, j), this.convert2Dto1D(i + 1, j));
      }
    } else {
      this.weightedQuickUnionUF.union(this.convert2Dto1D(i, j), this.endPointIndex);
    }
  }

  /**
   * Is site (row i, column j) open?
   * @param i row index.
   * @param j column index.
   * @returns true if the site at (row i, column j) is open.
   */
  public isOpen(i: number, j: number): boolean {
    return this.opened[this.convert2Dto1D(i, j)];
  }

  /**
   * Does the system percolate?
   * @returns true if the system percolates (i.e. there is a path between top and bottom rows of the grid).
   */
  public percolates(): boolean {
    return this.weightedQuickUnionUF.connected(this.startPointIndex, this.endPointIndex);
  }

  /**
   * Converts 2 dimentional array coordinates to an index in the underlying single dimentional array.
   * @param i row index.
   * @param j column index.
   * @returns index in the underlying array.
   */
  private convert2Dto1D(i: number, j: number): number {
    return (i - 1) * this.N + j;
  }

  /**
   * @returns amount of rows and columns in the grid.
   */
  public get N(): number {
    return this.n;
  }
}
