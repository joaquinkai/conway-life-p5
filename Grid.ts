type GridArray = boolean[][];

class Grid {
  private readonly rows: number;
  private readonly cols: number;
  private cells: GridArray;

  constructor(rows: number, cols: number, cells?: GridArray) {
    this.rows = rows;
    this.cols = cols;
    const afl = Grid.arrayFromLength;
    this.cells = cells || <GridArray> afl(rows, () => afl(cols, () => false));
  }

  get(row: number, col: number): boolean {
    return this.cells[row][col];
  }

  set(row: number, col: number, value: boolean) {
    this.cells[row][col] = value;
  }

  advance(): void {
    const afl = Grid.arrayFromLength;
    this.cells = <GridArray>afl(this.rows, (_, ri) => afl(this.cols, (_, ci) => this.isNewCellOn(ri, ci)));
  }

  private static arrayFromLength(length: number, fn) {
    return Array.from({length: length}, fn);
  }

  private isNewCellOn(row: number, col: number): boolean {
    const neighbors = this.countNeighbors(row, col);
    return this.cells[row][col] ? neighbors === 2 || neighbors === 3 : neighbors === 3;
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
      if (! invalidOffsets && this.cells[neighborRow][neighborCol])
        ++n;
    });

    return n;
  }
}
