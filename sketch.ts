declare const p5;

new p5(p => {
  const ROWS = 18;
  const COLS = 11;
  const grid = new Grid(ROWS, COLS);
  const start = [
    "           ",
    "           ",
    "           ",
    "    xxx    ",
    "     x     ",
    "     x     ",
    "    xxx    ",
    "           ",
    "    xxx    ",
    "    xxx    ",
    "           ",
    "    xxx    ",
    "     x     ",
    "     x     ",
    "    xxx    ",
    "           ",
    "           ",
    "           ",
  ];
  start.forEach((row: string, iRow) => {
    for (let iCol = 0; iCol < COLS; ++iCol) {
      grid.set(iRow, iCol, row[iCol] !== ' ');
    }
  });

  p.setup = () => {
    p.createCanvas(p.windowWidth - 10, p.windowHeight - 50, p.WEBGL);
  };

  p.draw = () => {
    p.frameRate(2);
    const topMargin = 100;
    p.translate(-p.width / 2, -p.height / 2);
    const cellHeight = p.height / ROWS;
    const cellWidth = p.width / COLS;
    const cellSize = p.min(cellHeight, cellWidth);
    for (let row = 0; row < ROWS; ++row) {
      for (let col = 0; col < COLS; ++col) {
        p.strokeWeight(5);
        p.stroke('white');
        p.fill(grid.get(row, col) ? 'purple' : 'white');
        p.rect(col * cellSize, topMargin + row * cellSize,
          cellSize, cellSize);
      }
    }
    grid.advance();
  };

});
