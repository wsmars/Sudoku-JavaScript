var Board = require('../lib/board');
var View = require('./sudoku-view');

$(function () {
  var $board = $(".sudoku");
  new View($board);
});
