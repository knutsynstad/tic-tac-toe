const rotate = function(board, degrees) {
  if (degrees === 90) {
    return [
      board[6], board[3], board[0],
      board[7], board[4], board[1], 
      board[8], board[5], board[2]]
  } else if (degrees === 180) {
    return [
      board[8], board[7], board[6],
      board[5], board[4], board[3],
      board[2], board[1], board[0]]
  } else if (degrees === 270) {
    return [
      board[2], board[5], board[8],
      board[1], board[4], board[7],
      board[0], board[3], board[6]]
  }
}

module.exports = rotate
