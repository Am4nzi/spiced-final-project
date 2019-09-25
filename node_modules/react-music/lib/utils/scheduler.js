'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scheduler = function () {
  function Scheduler(opts) {
    _classCallCheck(this, Scheduler);

    this.context = opts.context;
    this.interval = 0.025;
    this.aheadTime = 0.0;
    this.playbackTime = this.context.currentTime;

    this.timerID = 0;
    this.scheduleID = 0;
    this.schedules = [];
  }

  _createClass(Scheduler, [{
    key: 'start',
    value: function start(callback, args) {
      var _this = this;

      var loop = function loop() {
        var t0 = _this.context.currentTime;
        var t1 = t0 + _this.aheadTime;

        _this.process(t0, t1);
      };

      if (this.timerID === 0) {
        this.timerID = setInterval(loop, this.interval * 1000);

        if (callback) {
          this.insert(this.context.currentTime, callback, args);
          loop();
        }
      } else {
        this.insert(this.context.currentTime, callback, args);
      }

      return this;
    }
  }, {
    key: 'stop',
    value: function stop(reset) {
      if (this.timerID !== 0) {
        clearInterval(this.timerID);
        this.timerID = 0;
      }

      if (reset) {
        this.schedules.splice(0);
      }

      return this;
    }
  }, {
    key: 'insert',
    value: function insert(time, callback, args) {
      var id = ++this.scheduleID;
      var event = { id: id, time: time, callback: callback, args: args };

      if (this.schedules.length === 0 || this.schedules[this.schedules.length - 1].time <= time) {
        this.schedules.push(event);
      } else {
        for (var i = 0, imax = this.schedules.length; i < imax; i++) {
          if (time < this.schedules[i].time) {
            this.schedules.splice(i, 0, event);
            break;
          }
        }
      }

      return id;
    }
  }, {
    key: 'nextTick',
    value: function nextTick(time, callback, args) {
      return this.insert(time + this.aheadTime, callback, args);
    }
  }, {
    key: 'remove',
    value: function remove(scheduleID) {
      if (typeof scheduleID === 'number') {
        for (var i = 0, imax = this.schedules.length; i < imax; i++) {
          if (scheduleID === this.schedules[i].id) {
            this.schedules.splice(i, 1);
            break;
          }
        }
      }

      return scheduleID;
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.schedules.splice(0);
    }
  }, {
    key: 'process',
    value: function process(t0, t1) {
      this.playbackTime = t0;

      while (this.schedules.length && this.schedules[0].time < t1) {
        var event = this.schedules.shift();
        var playbackTime = event.time;
        var args = event.args;

        this.playbackTime = playbackTime;

        event.callback({ playbackTime: playbackTime, args: args });
      }

      this.playbackTime = t0;
    }
  }]);

  return Scheduler;
}();

exports.default = Scheduler;