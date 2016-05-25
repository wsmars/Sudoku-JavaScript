function NodeTree (node) {
  this.prv = typeof node !== 'undefined' ?  node : null;
  this.nxt = null;
  this.pos = [];
  this.val;
  this.possibleVal = [];
}

// assign values for properties of node but this.val
NodeTree.prototype.setNode = function() {
  this.setLink();
  this.setPos();
  this.setPossibleVal();
}

// link node with previous node
NodeTree.prototype.setLink = function () {
  this.prv.nxt = this;
};

// set this.position
NodeTree.prototype.setPos = function () {
  var prv = this.prv;
  var row, col;
  var prvRow = this.prv.pos[0];
  var prvCol = this.prv.pos[1];
  if (prvCol === 8) {
    row = (prvRow + 1);
    col = 0;
  }
  else {
    row = prvRow;
    col = (prvCol + 1);
  }
  this.pos = [row, col];
};

// setVal by last number of possibleVal array
NodeTree.prototype.setVal = function () {
  this.val = this.possibleVal.pop();
};

// find exists row values
NodeTree.prototype.rowVals = function () {
  var result = [];
  var currentNode = this.prv;
  var col = this.pos[1];
  for (var i = 0; i < col; i++) {
    result.push(currentNode.val);
    currentNode = currentNode.prv;
  }
  return result;
};

// find exists col values
NodeTree.prototype.colVals = function () {
  var result = [];
  var currentNode = this.prv;
  var col = this.pos[1];
  while (currentNode && ((currentNode.pos[0] != 0) || (currentNode.pos[1] >= col))) {
    if (currentNode.pos[1] === col) {
      result.push(currentNode.val);
    }
    currentNode = currentNode.prv;
  }
  return result;
};

// find exists block values
NodeTree.prototype.blockVals = function () {
  var result = [];
  var range = [[0,2],[3,5],[6,8]];
  var row = this.pos[0];
  var col = this.pos[1];
  var currentNode = this.prv;
  for (var i = 0; i < range.length; i++) {
    if (row >= range[i][0] && row <= range[i][1]) {
      var rangeRow = range[i];
    }
  }
  for (var j = 0; j < range.length; j++) {
    if (col >= range[j][0] && col <= range[j][1]) {
      var rangeCol = range[j];
    }
  }
  while (currentNode) {
    if ((currentNode.pos[0] >= rangeRow[0] && currentNode.pos[0] <= rangeRow[1]) &&
         currentNode.pos[1] >= rangeCol[0] && currentNode.pos[1] <= rangeCol[1]) {
      result.push(currentNode.val);
    }
    currentNode = currentNode.prv;
  }
  return result;
};

//  find possibleVal which is an array construct by 1-9 which not in rowVals, colVals and blockVals
NodeTree.prototype.setPossibleVal = function(rowVals, colVals, blockVals) {
  var rowVals = this.rowVals();
  var colVals = this.colVals();
  var blockVals = this.blockVals();
  var rand = [1,2,3,4,5,6,7,8,9];
  shuffle(rand);
  for (var i = 0; i < 9; i++) {
    if ((!rowVals.includes(rand[i])) && (!colVals.includes(rand[i])) && (!blockVals.includes(rand[i]))) {
      this.possibleVal.push(rand[i]);
    }
  }
};

// shuffle array
function shuffle(array) {
  var j, x, i;
  for (i = array.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = array[i - 1];
    array[i - 1] = array[j];
    array[j] = x;
  }
}

module.exports = NodeTree;
