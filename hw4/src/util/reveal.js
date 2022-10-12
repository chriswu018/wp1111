/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

const other = (board, x, y, ct) => {
  let boardSize = board.length;

  if (ct[x][y] === 1) return;
  ct[x][y] = 1;

  if (board[x][y].value !== 0) return;
  // Top
  if (x > 0) other(board, x-1, y, ct);
  // Top Right
  if (x > 0 && y < boardSize - 1) other(board, x-1, y+1, ct);
  // Right
  if (y < boardSize - 1) other(board, x, y+1, ct);
  // Bottom Right
  if (x < boardSize - 1 && y < boardSize - 1) other(board, x+1, y+1, ct);
  // Bottom
  if (x < boardSize - 1) other(board, x+1, y, ct);
  // Bottom Left
  if (x < boardSize - 1 && y > 0) other(board, x+1, y-1, ct);
  // Left
  if (y > 0) other(board, x, y-1, ct);
  // Top Left
  if (x > 0 && y > 0) other(board, x-1, y-1, ct);
}

export const revealed = (board, x, y, newNonMinesCount) => {
    let boardSize = board.length;
    let ct = new Array(boardSize);
    for(let i=0;i<boardSize;i++){
      ct[i] = new Array(boardSize);
      for(let j=0;j<boardSize;j++){
        ct[i][j] = 0;
      }
    }
    other(board, x, y, ct);

    for(let i=0;i<boardSize;i++){
      for(let j=0;j<boardSize;j++){
        if(ct[i][j] === 1 && board[i][j].revealed === false){
          board[i][j].revealed = true;
          newNonMinesCount--;
        }
      }
    }
    


    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    return { board, newNonMinesCount };
};
