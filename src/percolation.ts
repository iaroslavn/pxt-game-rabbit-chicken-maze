import { WeightedQuickUnionUF } from './weightedQuickUnionUF';

export class Percolation {
  private startPointIndex: number;
  private endPointIndex: number;

  private id: number[];
  private opened: boolean[];

  private weightedQuickUnionUF: WeightedQuickUnionUF;

  constructor(readonly N: number) {
    const totalPointsCount = N * N + 2;
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

  public isOpen(i: number, j: number): boolean {
    return this.opened[this.convert2Dto1D(i, j)];
  }

  public percolates(): boolean {
    return this.weightedQuickUnionUF.connected(this.startPointIndex, this.endPointIndex);
  }

  private convert2Dto1D(i: number, j: number): number {
    return (i - 1) * this.N + j;
  }
}
