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

var _tunajs = require('tunajs');

var _tunajs2 = _interopRequireDefault(_tunajs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable no-restricted-syntax */


var Delay = function (_Component) {
  _inherits(Delay, _Component);

  function Delay(props, context) {
    _classCallCheck(this, Delay);

    var _this = _possibleConstructorReturn(this, (Delay.__proto__ || Object.getPrototypeOf(Delay)).call(this, props));

    var tuna = new _tunajs2.default(context.audioContext);

    _this.connectNode = new tuna.Delay({
      feedback: props.feedback,
      delayTime: props.delayTime,
      wetLevel: props.wetLevel,
      dryLevel: props.dryLevel,
      cutoff: props.cutoff,
      bypass: props.bypass
    });

    _this.connectNode.connect(context.connectNode);
    return _this;
  }

  _createClass(Delay, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      for (var prop in nextProps) {
        if (this.connectNode[prop]) {
          this.connectNode[prop] = nextProps[prop];
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
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

  return Delay;
}(_react.Component);

Delay.propTypes = {
  bypass: _propTypes2.default.number,
  children: _propTypes2.default.node,
  cutoff: _propTypes2.default.number,
  delayTime: _propTypes2.default.number,
  dryLevel: _propTypes2.default.number,
  feedback: _propTypes2.default.number,
  wetLevel: _propTypes2.default.number
};
Delay.defaultProps = {
  bypass: 0,
  cutoff: 2000,
  delayTime: 150,
  dryLevel: 1,
  feedback: 0.45,
  wetLevel: 0.25
};
Delay.contextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
Delay.childContextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
exports.default = Delay;