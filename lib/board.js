// var NodeTree = require('./nodeTree');

function Board () {
  this.root = new NodeTree();
  this.root.pos = [0,0];
  var rand = [1,2,3,4,5,6,7,8,9];
  shuffle(rand);
  this.root.val = rand.pop();
  this.root.possibleVal = rand;
  this.boardArray = [this.root];
}

Board.prototype.createNode = function (node) {
  var currentNode = new NodeTree(node)
  currentNode.setNode();
  return currentNode;
};

Board.prototype.createFirstRow = function () {
  var currentNode = this.root;
  for (var i = 0; i < 7; i++) {
    var temp = this.createNode(currentNode);
    temp.setVal();
    currentNode = temp;
    this.boardArray.push(currentNode);
  }
  temp = this.createNode(currentNode);
  currentNode = temp;
  return currentNode;
}

Board.prototype.createRestNode = function (node) {
  var currentNode = node;
  if ((currentNode.pos[0] === 8 && currentNode.pos[1] === 8) && currentNode.possibleVal.length > 0) {
    currentNode.setVal();
    this.boardArray.push(currentNode);
    console.log(this.boardArray.length);
    return this.boardArray;
  }
  if (currentNode.possibleVal.length === 0) {
    this.boardArray.pop();
    this.createRestNode(currentNode.prv)
  }
  else {
    currentNode.setVal();
    this.boardArray.push(currentNode);
    var nextNode = this.createNode(currentNode);
    this.createRestNode(nextNode);
  }
};

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

// module.exports = Board;
