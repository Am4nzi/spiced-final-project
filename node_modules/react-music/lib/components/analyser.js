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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable no-restricted-syntax */


var Analyser = function (_Component) {
  _inherits(Analyser, _Component);

  function Analyser(props, context) {
    _classCallCheck(this, Analyser);

    var _this = _possibleConstructorReturn(this, (Analyser.__proto__ || Object.getPrototypeOf(Analyser)).call(this, props));

    _this.visualization = context.audioContext.createScriptProcessor(2048, 1, 1);
    _this.visualization.connect(context.audioContext.destination);

    _this.connectNode = context.audioContext.createAnalyser();
    _this.connectNode.connect(context.connectNode);
    _this.applyProps = _this.applyProps.bind(_this);

    _this.visualization.onaudioprocess = function () {
      if (props.onAudioProcess) {
        props.onAudioProcess(_this.connectNode);
      }
    };
    return _this;
  }

  _createClass(Analyser, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.applyProps(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.applyProps(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.connectNode.disconnect();
    }
  }, {
    key: 'applyProps',
    value: function applyProps(props) {
      for (var prop in props) {
        if (this.connectNode[prop]) {
          this.connectNode[prop] = props[prop];
        }
      }
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

  return Analyser;
}(_react.Component);

Analyser.propTypes = {
  children: _propTypes2.default.node,
  fftSize: _propTypes2.default.number,
  onAudioProcess: _propTypes2.default.func,
  smoothingTimeConstant: _propTypes2.default.number
};
Analyser.defaultProps = {
  fftSize: 128,
  onAudioProcess: function onAudioProcess() {},
  smoothingTimeConstant: 0.3
};
Analyser.contextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
Analyser.childContextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
exports.default = Analyser;