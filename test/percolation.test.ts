import { Percolation } from '../src/percolation';

let percolation: Percolation;

beforeEach(() => {
  percolation = new Percolation(2);
});

describe('Percolation test', () => {
  it('isOpen() should return correct cell status', () => {
    percolation.open(1, 1);
    percolation.open(2, 2);

    expect(percolation.isOpen(1, 1)).toBe(true);
    expect(percolation.isOpen(1, 2)).toBe(false);
    expect(percolation.isOpen(2, 1)).toBe(false);
    expect(percolation.isOpen(2, 2)).toBe(true);
  });

  it('should not percolate when only diagonal cells are open', () => {
    percolation.open(1, 1);
    percolation.open(2, 2);

    expect(percolation.percolates()).toBe(false);
  });

  it('should not percolate when only horizontal cells are open', () => {
    percolation.open(1, 1);
    percolation.open(1, 2);

    expect(percolation.percolates()).toBe(false);
  });

  it('should percolate when vertical cells are open', () => {
    percolation.open(1, 2);
    percolation.open(2, 2);

    expect(percolation.percolates()).toBe(true);
  });
});
