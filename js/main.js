var Board = require('../lib/board');
var View = require('./sudoku-view');

$(function () {
  var $board = $(".sudoku");
  var board = new Board();
  new View($board, board);
});
