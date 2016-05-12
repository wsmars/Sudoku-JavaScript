var View = require('./sudoku-view');

$(function () {
  var $sudoku = $(".sudoku");
  var $board = $(".board");
  new View($sudoku, $board);
});
