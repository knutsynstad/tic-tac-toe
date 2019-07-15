const fs = require('fs')
const Board = require('./modules/Board.js')
const debug = require('./modules/debug.js')

let boards = []
let queue  = []
let nextId = 1

// Add a blank board to the queue
queue.push(new Board())

// While there are still boards in the queue,
// generate unique children for the queue,
// before moving the board to the collection.
while (queue.length > 0) {
  // Pull first board from queue
  let board = queue.shift()
  // If the game is ongoing
  if (board.isLive()) {
    // generate all candidate children for all combinations
    for (let cell = 0; cell < board.cells.length; cell++) {
      let child = new Board(board)
      if (child.cells[cell] === "E") {
        child.id = nextId
        child.cells[cell] = child.nextPlayer()
        // Determine if generated child is unique
        let results = child.findSimilar([boards, queue])
        if (results.unique) {
          // Unique children are added to queue
          // to generate subsequent boards (plays)
          queue.push(child)
          // The child is associated with the parent
          board.addChild(child.id)
          nextId++
        } else if (results.match) {
          // If the child is a duplicate,
          // the match is associated with the parent
          board.addChild(results.match)
        }
      }
    }
  }
  // Move board into collection
  boards.push(board)
}

// Save results to a JSON file
let output = JSON.stringify(boards, null, 2)
fs.writeFileSync('boards.json', output)

// Troubleshooting
debug(boards)
