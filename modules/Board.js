const rotate = require('./rotate.js')
const reflect = require('./reflect.js')

// Create a new candidate board based on parent
class Board {
  constructor(parent) {
    this.id = 0
    this.cells = []
    this.symmetries = []
    this.parents = []
    this.children = []
    this.result = false

    if (parent) {
      this.parents.push(parent.id)
      this.cells.push(...parent.cells)
      this.level = parent.level + 1
    } else {
      this.cells = ["E", "E", "E", "E", "E", "E", "E", "E", "E"]
      this.level = 0
    }
  }


  addSymmetry(symmetry) {
    if (!this.symmetries.includes(symmetry)) {
      this.symmetries.push(symmetry)
    }
  }


  addChild(id) {
    if (!this.children.includes(id)) {
      this.children.push(id)
    }
  }


  addParent(id) {
    if (!this.parents.includes(id)) {
      this.parents.push(id)
    }
  }

  isLive() {
    let winLines = [
      [0,1,2], // Row 1
      [3,4,5], // Row 2
      [6,7,8], // Row 3
      [0,3,6], // Column 1
      [1,4,7], // Column 2
      [2,5,8], // Column 3
      [0,4,8], // Top left to bottom right
      [6,4,2]  // Bottom left to top right
    ]

    // 1. Do we have a winner?
    for (let line = 0; line < winLines.length; line++) {
      let rule = winLines[line]
      if  (this.cells[rule[0]] === this.cells[rule[1]]
        && this.cells[rule[0]] === this.cells[rule[2]]
        && this.cells[rule[0]] !== "E") {
        this.result = this.cells[rule[0]]
        return false
      }
    }

    // 2. Are there available cells?
    if (this.cells.indexOf("E") >= 0) {
      // Available cells and no winner means the game continues
      return true
    } else {
      // No available cells and no winner means the game is a draw
      this.result = "draw"
      return false
    }
  }


  nextPlayer() {
    let e = 0
    let x = 0
    let o = 0

    this.cells.forEach(cell => {
      if (cell === "E") e++
      if (cell === "X") x++
      if (cell === "O") o++
    })

    // X begins, then players alternate
    if ((e === 9) || (o >= x)) {
      return "X"
    } else {
      return "O"
    }
  }


  findSimilar(sources) {
    let unique = true
    let match = false


    const sameBoard = function(a, b) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false
        }
      }
      return true
    }

    // Iterate over sources (boards + queue)
    for (let source = 0; source < sources.length; source++) {
      // And all boards
      for (let board = 0; board < sources[source].length; board++) {
        // to look for duplicates
        let target = sources[source][board]

        // Look for duplicate boards
        if (sameBoard(target.cells, this.cells)) {
          target.addSymmetry('duplicate')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for rotational symmetry
        if (sameBoard(rotate(target.cells, 90), this.cells)) {
          target.addSymmetry('rotational')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for rotational symmetry
        if (sameBoard(rotate(target.cells, 180), this.cells)) {
          target.addSymmetry('rotational')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for rotational symmetry
        if (sameBoard(rotate(target.cells, 270), this.cells)) {
          target.addSymmetry('rotational')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for reflectional symmetry
        if (sameBoard(reflect(target.cells, 'horizontal'), this.cells)) {
          target.addSymmetry('reflectional')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for reflectional symmetry
        if (sameBoard(reflect(target.cells, 'vertical'), this.cells)) {
          target.addSymmetry('reflectional')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for reflectional symmetry
        if (sameBoard(reflect(target.cells, 'diagonal1'), this.cells)) {
          target.addSymmetry('reflectional')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }

        // Look for reflectional symmetry
        if (sameBoard(reflect(target.cells, 'diagonal2'), this.cells)) {
          target.addSymmetry('reflectional')
          target.addParent(this.parents[0])
          match = target.id
          unique = false
        }


      }
    }
    return {
      unique: unique,
      match: match
    }
  }

}

module.exports = Board
