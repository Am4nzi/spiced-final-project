'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scheduler = require('../utils/scheduler');

var _scheduler2 = _interopRequireDefault(_scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable no-loop-func, react/no-did-mount-set-state */


var Song = function (_Component) {
  _inherits(Song, _Component);

  function Song(props) {
    _classCallCheck(this, Song);

    var _this = _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).call(this, props));

    _this.state = {
      buffersLoaded: false
    };

    _this.barInterval = 60000 / props.tempo * 4;
    _this.bars = {};
    _this.buffers = {};
    _this.instruments = {};
    _this.busses = {};

    _this.loop = _this.loop.bind(_this);
    _this.bufferLoaded = _this.bufferLoaded.bind(_this);
    _this.getMaster = _this.getMaster.bind(_this);
    _this.getMaxBars = _this.getMaxBars.bind(_this);

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    _this.audioContext = new AudioContext();

    _this.scheduler = new _scheduler2.default({
      context: _this.audioContext
    });
    return _this;
  }

  _createClass(Song, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        tempo: this.props.tempo,
        audioContext: this.audioContext,
        barInterval: this.barInterval,
        bufferLoaded: this.bufferLoaded,
        connectNode: this.audioContext.destination,
        getMaster: this.getMaster,
        scheduler: this.scheduler
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (Object.keys(this.buffers).length === 0) {
        this.setState({
          buffersLoaded: true
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.barInterval = 60000 / nextProps.tempo * 4;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (prevState.buffersLoaded !== this.state.buffersLoaded || prevProps.playing !== this.props.playing) {
        if (this.state.buffersLoaded === true && this.props.playing === true) {
          setTimeout(function () {
            _this2.scheduler.start(_this2.loop);
          }, 0);
        } else {
          this.scheduler.stop(true);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.audioContext.close();
    }
  }, {
    key: 'getMaster',
    value: function getMaster() {
      return this;
    }
  }, {
    key: 'getMaxBars',
    value: function getMaxBars() {
      var _this3 = this;

      return Math.max.apply(Math, _toConsumableArray(Object.keys(this.bars).map(function (b) {
        return _this3.bars[b];
      })));
    }
  }, {
    key: 'bufferLoaded',
    value: function bufferLoaded() {
      if (Object.keys(this.buffers).length === 0) {
        this.setState({
          buffersLoaded: true
        });
      }
    }
  }, {
    key: 'loop',
    value: function loop(e) {
      var _this4 = this;

      var maxBars = Object.keys(this.bars).length ? this.getMaxBars() : 1;
      Object.keys(this.instruments).forEach(function (id) {
        var callback = _this4.instruments[id];
        callback(e.playbackTime);
      });
      this.scheduler.insert(e.playbackTime + this.barInterval * maxBars / 1000, this.loop);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        this.props.children
      );
    }
  }]);

  return Song;
}(_react.Component);

Song.propTypes = {
  children: _propTypes2.default.node,
  playing: _propTypes2.default.bool,
  tempo: _propTypes2.default.number
};
Song.defaultProps = {
  playing: false,
  tempo: 90
};
Song.childContextTypes = {
  audioContext: _propTypes2.default.object,
  barInterval: _propTypes2.default.number,
  bufferLoaded: _propTypes2.default.func,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func,
  scheduler: _propTypes2.default.object,
  tempo: _propTypes2.default.number
};
exports.default = Song;