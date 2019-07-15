const reflect = function(board, direction) {

  if (direction === 'horizontal') {
    return [
      board[2], board[1], board[0],
      board[5], board[4], board[3],
      board[8], board[7], board[6]]
  } else if (direction === 'vertical') {
    return [
      board[6], board[7], board[8],
      board[3], board[4], board[5],
      board[0], board[1], board[2]]
  } else if (direction === 'diagonal1') {
    // Top left to bottom right
    return [
      board[0], board[3], board[6],
      board[1], board[4], board[7],
      board[2], board[5], board[8]]
  } else if (direction === 'diagonal2') {
    // Bottom left to top right
    return [
      board[8], board[5], board[2],
      board[7], board[4], board[1],
      board[6], board[3], board[0]]
  }
}

module.exports = reflect
