/**
 * The WeightedQuickUnionUF class represents a union–find data type (also known as the disjoint-sets data type).
 * It supports the union and find operations, along with a connected operation for determining whether
 * two sites are in the same component and a count operation that returns the total number of components.
 * This implementation uses weighted quick union by size (without path compression).
 * Initializing a data structure with N sites takes linear time.
 * Afterwards, the union, find, and connected operations take logarithmic time (in the worst case) and the
 * count operation takes constant time.
 */
export class WeightedQuickUnionUF {
  /**
   * parent[i] = parent of i.
   */
  private parent: number[];
  /**
   * size[i] = number of sites in subtree rooted at i.
   */
  private size: number[];
  /**
   * number of components.
   */
  private count: number;
  /**
   * Initializes an empty union–find data structure with n sites 0 through n-1.
   * Each site is initially in its own component.
   * @param n the number of sites.
   */
  constructor(n: number) {
    this.count = n;
    this.parent = [];
    this.size = [];

    for (let i = 0; i < n; i++) {
      this.parent.push(i);
      this.size.push(1);
    }
  }

  /**
   * @param p the integer representing one object.
   * @returns the component identifier for the component containing site p.
   */
  public find(p: number): number {
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }

    return p;
  }

  /**
   * @param  p the integer representing one site.
   * @param  q the integer representing the other site.
   * @returns true if the the two sites are in the same component.
   */
  public connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  /**
   * Merges the component containing site p with the the component containing site q.
   * @param  p the integer representing one site.
   * @param  q the integer representing the other site.
   */
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

  /**
   * @returns the number of connected components.
   */
  get componentCount(): number {
    return this.count;
  }
}
