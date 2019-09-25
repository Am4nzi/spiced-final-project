'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LFO = function (_Component) {
  _inherits(LFO, _Component);

  function LFO() {
    _classCallCheck(this, LFO);

    return _possibleConstructorReturn(this, (LFO.__proto__ || Object.getPrototypeOf(LFO)).apply(this, arguments));
  }

  _createClass(LFO, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var volumeGain = this.context.audioContext.createGain();
      volumeGain.gain.value = this.props.gain;
      this.osc = this.context.audioContext.createOscillator();
      this.osc.frequency.value = this.props.frequency;
      this.osc.type = this.props.type;
      this.osc.connect(volumeGain);
      volumeGain.connect(this.props.connect(this.context.connectNode));

      this.osc.start(this.context.audioContext.currentTime);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.osc.stop();
      this.connectNode.disconnect();
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

  return LFO;
}(_react.Component);

LFO.displayName = 'Synth';
LFO.propTypes = {
  children: _propTypes2.default.node,
  connect: _propTypes2.default.func,
  frequency: _propTypes2.default.number,
  gain: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle'])
};
LFO.defaultProps = {
  connect: function connect(node) {
    return node.gain;
  },
  frequency: 1,
  gain: 0.5,
  type: 'sine'
};
LFO.contextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
exports.default = LFO;