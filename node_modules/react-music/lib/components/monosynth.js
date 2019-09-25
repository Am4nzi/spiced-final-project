'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _noteParser = require('note-parser');

var _noteParser2 = _interopRequireDefault(_noteParser);

var _audioContour = require('audio-contour');

var _audioContour2 = _interopRequireDefault(_audioContour);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monosynth = function (_Component) {
  _inherits(Monosynth, _Component);

  function Monosynth(props, context) {
    _classCallCheck(this, Monosynth);

    var _this = _possibleConstructorReturn(this, (Monosynth.__proto__ || Object.getPrototypeOf(Monosynth)).call(this, props));

    _this.getSteps = _this.getSteps.bind(_this);
    _this.playStep = _this.playStep.bind(_this);

    _this.connectNode = context.audioContext.createGain();
    _this.connectNode.gain.value = props.gain;
    _this.connectNode.connect(context.connectNode);
    return _this;
  }

  _createClass(Monosynth, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.id = _uuid2.default.v1();
      var master = this.context.getMaster();
      master.instruments[this.id] = this.getSteps;

      this.amplitudeGain = this.context.audioContext.createGain();
      this.amplitudeGain.gain.value = 0;
      this.amplitudeGain.connect(this.connectNode);

      this.osc = this.context.audioContext.createOscillator();
      this.osc.type = this.props.type;
      this.osc.connect(this.amplitudeGain);

      if (this.props.busses) {
        this.props.busses.forEach(function (bus) {
          if (master.busses[bus]) {
            _this2.osc.connect(master.busses[bus]);
          }
        });
      }

      this.osc.start(this.context.audioContext.currentTime);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var master = this.context.getMaster();
      delete master.instruments[this.id];
      this.osc.stop();
      this.connectNode.disconnect();
    }
  }, {
    key: 'getSteps',
    value: function getSteps(playbackTime) {
      var _this3 = this;

      var totalBars = this.context.getMaster().getMaxBars();
      var loopCount = totalBars / this.context.bars;

      var _loop = function _loop(i) {
        var barOffset = _this3.context.barInterval * _this3.context.bars * i / 1000;
        var stepInterval = _this3.context.barInterval / _this3.context.resolution;
        _this3.props.steps.forEach(function (step, index) {
          var time = barOffset + step[0] * stepInterval / 1000;
          var glide = false;

          if (index !== 0) {
            var lastTime = barOffset + _this3.props.steps[index - 1][0] * stepInterval / 1000;
            var lastDuration = _this3.props.steps[index - 1][1] * stepInterval / 1000;
            glide = lastTime + lastDuration > time;
          }

          _this3.context.scheduler.insert(playbackTime + time, _this3.playStep, {
            time: playbackTime,
            step: step,
            glide: glide
          });
        });
      };

      for (var i = 0; i < loopCount; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'createOscillator',
    value: function createOscillator() {
      var _arguments = Array.prototype.slice.call(arguments),
          time = _arguments[0],
          note = _arguments[1],
          duration = _arguments[2],
          glide = _arguments[3];

      var transposed = note.slice(0, -1) + (parseInt(note[note.length - 1], 0) + parseInt(this.props.transpose, 0));

      var env = (0, _audioContour2.default)(this.context.audioContext, {
        attack: this.props.envelope.attack,
        decay: this.props.envelope.decay,
        sustain: this.props.envelope.sustain,
        release: this.props.envelope.release
      });

      env.connect(this.amplitudeGain.gain);
      this.osc.frequency.setTargetAtTime(_noteParser2.default.freq(transposed), time, glide ? this.props.glide : 0.001);

      env.start(time);
      env.stop(this.context.audioContext.currentTime + duration);
    }
  }, {
    key: 'playStep',
    value: function playStep(e) {
      var _e$args = e.args,
          step = _e$args.step,
          glide = _e$args.glide,
          time = _e$args.time;

      var note = step[2];
      var stepInterval = this.context.barInterval / this.context.resolution;
      var duration = step[1] * stepInterval / 1000;
      this.createOscillator(time, note, duration, glide);
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

  return Monosynth;
}(_react.Component);

Monosynth.displayName = 'Synth';
Monosynth.propTypes = {
  busses: _propTypes2.default.array,
  children: _propTypes2.default.node,
  envelope: _propTypes2.default.shape({
    attack: _propTypes2.default.number,
    decay: _propTypes2.default.number,
    sustain: _propTypes2.default.number,
    release: _propTypes2.default.number
  }),
  gain: _propTypes2.default.number,
  glide: _propTypes2.default.number,
  steps: _propTypes2.default.array.isRequired,
  transpose: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle']).isRequired
};
Monosynth.defaultProps = {
  envelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.2,
    release: 0.2
  },
  gain: 0.5,
  glide: 0.1,
  transpose: 0
};
Monosynth.contextTypes = {
  audioContext: _propTypes2.default.object,
  bars: _propTypes2.default.number,
  barInterval: _propTypes2.default.number,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func,
  resolution: _propTypes2.default.number,
  scheduler: _propTypes2.default.object,
  tempo: _propTypes2.default.number
};
Monosynth.childContextTypes = {
  audioContext: _propTypes2.default.object,
  bars: _propTypes2.default.number,
  barInterval: _propTypes2.default.number,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func,
  resolution: _propTypes2.default.number,
  scheduler: _propTypes2.default.object,
  tempo: _propTypes2.default.number
};
exports.default = Monosynth;