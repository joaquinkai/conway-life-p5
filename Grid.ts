type GridArray = boolean[][];

class Grid {
  private readonly rows: number;
  private readonly cols: number;
  private prevGrid?: GridArray;
  private grid: GridArray;

  constructor(rows: number, cols: number, cells?: GridArray) {
    this.rows = rows;
    this.cols = cols;
    const afl = Grid.arrayFromLength;
    this.grid = cells || <GridArray> afl(rows, () => afl(cols, () => false));
    this.prevGrid = null;
  }

  get(row: number, col: number): boolean {
    return this.grid[row][col];
  }

  getPrev(row: number, col: number): boolean {
    return this.prevGrid ? this.prevGrid[row][col] : null;
  }

  set(row: number, col: number, value: boolean) {
    this.grid[row][col] = value;
  }

  advance(): void {
    const afl = Grid.arrayFromLength;
    this.prevGrid = <GridArray>afl(this.rows, (_, ri) => afl(this.cols, (_, ci) => this.grid[ri][ci]));
    this.grid = <GridArray>afl(this.rows, (_, ri) => afl(this.cols, (_, ci) => this.isNewCellOn(ri, ci)));
  }

  private static arrayFromLength(length: number, fn) {
    return Array.from({length: length}, fn);
  }

  private isNewCellOn(row: number, col: number): boolean {
    const neighbors = this.countNeighbors(row, col);
    return this.prevGrid[row][col] ? neighbors === 2 || neighbors === 3 : neighbors === 3;
  }

  private countNeighbors(row: number, col: number): number {
    let n = 0;

    const neighborOffsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],          [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1],
    ];
    neighborOffsets.forEach(([colOff, rowOff]) => {
      const neighborCol = col + colOff;
      const neighborRow = row + rowOff;
      const invalidOffsets = neighborCol < 0 || neighborRow < 0 ||
        neighborCol >= this.cols || neighborRow >= this.rows;
      if (! invalidOffsets && this.prevGrid[neighborRow][neighborCol])
        ++n;
    });

    return n;
  }
}
