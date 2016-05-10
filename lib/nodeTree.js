function nodeTree (node) {
  this.prv = typeof node !== 'undefined' ?  node : null;
  this.nxt = null;
  this.pos = [];
  this.val = 0;
  this.possibleVal = [];
}

nodeTree.prototye.setNext = function (node) {
  this.nxt = node;
};

nodeTree.prototype.setPos = function (pos) {
  this.pos = pos;
};

nodeTree.prototype.setVal = function (val) {
  this.val = val;
};

// find exists row values
nodeTree.prototype.rowVals = function () {
  var result = [];
  var currentNode = this.prv;
  var pos = this.pos;
  for (var i = 0; i < pos[1]; i++) {
    result.push(currentNode.val);
    currentNode = currentNode.prv;
  }
  return result;
};

// find exists col values
nodeTree.prototype.colVals = function () {
  var result = [];
  var currentNode = this.prv;
  var col = this.pos[1];
  while ((currentNode.pos[0] != 0) || (currentNode.pos[1] >= col) {
    if (currentNode.pos[1] === col) {
      result.push(currentNode.val);
    }
    currentNode = currentNode.prv;
  }
  return result;
};

// find exists block values
nodeTree.prototype.blockVals = function () {

};

nodeTree.prototype.setPossibleVal = function(rowVals, colVals, blockVals) {
  for (var i = 1; i <= 9; i++) {
    if (!rowVals.includes(i) && !colVals.incudes(i) && !blockVals.includes(i)) {
      this.possibleVal.push(i);
    }
  }
}
