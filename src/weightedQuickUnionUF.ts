export class WeightedQuickUnionUF {
  private parent: number[];
  private size: number[];
  private count: number;

  constructor(n: number) {
    this.count = n;
    this.parent = [];
    this.size = [];

    for (let i = 0; i < n; i++) {
      this.parent.push(i);
      this.size.push(1);
    }
  }

  public find(p: number): number {
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }

    return p;
  }

  public connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  public union(p: number, q: number): void {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP !== rootQ) {
      if (this.size[rootP] < this.size[rootQ]) {
        this.parent[rootP] = rootQ;
        this.size[rootQ] += this.size[rootP];
      } else {
        this.parent[rootQ] = rootP;
        this.size[rootP] += this.size[rootQ];
      }

      this.count--;
    }
  }

  get componentCount(): number {
    return this.count;
  }
}
