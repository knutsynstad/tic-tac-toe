function debug(boards) {
  let results = []
  for (let i = 0; i < 10; i++) {
    results.push({ 
      level: i,
      x: 0,
      o: 0,
      duplicate: 0,
      reflectional: 0,
      rotational: 0,
      boards: 0
    })
  }

  boards.forEach(game => {
    results[game.level].boards += 1
    if (whoWon(game.cells) === "X") {
      results[game.level].x += 1
    } else if (whoWon(game.cells) === "O") {
      results[game.level].o += 1
    }

    if (game.symmetries.includes("duplicate")) {
      results[game.level].duplicate += 1
    }
    if (game.symmetries.includes("rotational")) {
      results[game.level].rotational += 1
    }
    if (game.symmetries.includes("reflectional")) {
      results[game.level].reflectional += 1
    }
  })

  console.log(`Found ${boards.length} unique combinations:`)
  console.table(results)

  let maxParents = 0
  let maxChildren = 0
  boards.forEach(board => {
    if (board.parents.length > maxParents) {
      maxParents = board.parents.length
    }
    if (board.children.length > maxChildren) {
      maxChildren = board.children.length
    }
  })
  console.log(`Max children: ${maxChildren} - Max parents: ${maxParents}`)
}

module.exports = debug

function whoWon(b) {
  // Horizontal
  if ((b[0] === b[1] && b[0] === b[2] && b[0] === "X")  // Row 1
    || (b[3] === b[4] && b[3] === b[5] && b[3] === "X") // Row 2
    || (b[6] === b[7] && b[6] === b[8] && b[6] === "X") // Row 3
    // Vertical
    || (b[0] === b[3] && b[0] === b[6] && b[0] === "X") // Column 1
    || (b[1] === b[4] && b[1] === b[7] && b[1] === "X") // Column 2
    || (b[2] === b[5] && b[2] === b[8] && b[2] === "X") // Column 3
    // Diagonal
    || (b[0] === b[4] && b[0] === b[8] && b[0] === "X")  // Top left to bottom right
    || (b[6] === b[4] && b[6] === b[2] && b[6] === "X")) // Bottom left to top right
  {
    return "X"
  }

  // Horizontal
  if ((b[0] === b[1] && b[0] === b[2] && b[0] === "O")  // Row 1
    || (b[3] === b[4] && b[3] === b[5] && b[3] === "O") // Row 2
    || (b[6] === b[7] && b[6] === b[8] && b[6] === "O") // Row 3
    // Vertical
    || (b[0] === b[3] && b[0] === b[6] && b[0] === "O") // Column 1
    || (b[1] === b[4] && b[1] === b[7] && b[1] === "O") // Column 2
    || (b[2] === b[5] && b[2] === b[8] && b[2] === "O") // Column 3
    // Diagonal
    || (b[0] === b[4] && b[0] === b[8] && b[0] === "O")  // Top left to bottom right
    || (b[6] === b[4] && b[6] === b[2] && b[6] === "O")) // Bottom left to top right
  {
    return "O"
  }
}
