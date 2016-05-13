function Clock () {
  this.startTime = new Date();
}

Clock.prototype.parse = function() {
  var diff = new Date(new Date() - this.startTime);
  var hour = ((diff.getHours()-16)<10?'0':'') + (diff.getHours()-16)
  var min = (diff.getMinutes()<10?'0':'') + diff.getMinutes()
  var sec = (diff.getSeconds()<10?'0':'') + diff.getSeconds()
  var display = document.getElementById('clock');
  display.innerHTML = hour + ":" + min + ":" + sec
}

Clock.prototype.tick = function() {
  var that = this;
  this.parse();
  this.interval = setInterval(function() { that.parse() }, 500);
}

Clock.prototype.stopClock = function() {
  var that = this;

  clearInterval(that.interval);
}

module.exports = Clock;
