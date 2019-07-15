# Tic-tac-toe
Generating a dataset of the 765 unique game boards, and the connections between them, in the game of tic-tac-toe. 

## boards.json data structure

```js
 [
  {...},
  ...
  {
    "id": 278,
    // Unique ID
    "cells": [
      "X",
      "E",
      "O",
      "X",
      "E",
      "E",
      "E",
      "X",
      "O"
    ],
    // Cells of the game board
    // left-to-right and top-to-bottom
    // Can be 'X', 'O', or 'E' for empty
    "symmetries": [
      "duplicate",
      "rotational"
    ],
    // If another board was excluded based on this board,
    // how was it similar? (duplicate/symmetrical)
    // 'duplicate', 'rotational', or 'reflectional'
    "parents": [
      100,
      114,
      141
    ],
    // list of game board IDs that preceeded this one
    "children": [
      378,
      494,
      497,
      486
    ],
    // List of game board IDs that followed this one
    "result": false,
    // 'false' if the game is ongoing,
    // if a result has been reached:
    // 'X', 'O', or 'draw'
    "level": 5
    // Game move # as 1–9
  },
  ...
  {...}
 ]
```

## Do it yourself

1. Clone the repository:
```
git clone https://github.com/knutsynstad/tic-tac-toe.git
```

2. Generate dataset:
```
node ttt.js
```
Results are saved to `boards.json`
