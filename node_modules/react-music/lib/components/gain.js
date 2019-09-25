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

var Gain = function (_Component) {
  _inherits(Gain, _Component);

  function Gain(props, context) {
    _classCallCheck(this, Gain);

    var _this = _possibleConstructorReturn(this, (Gain.__proto__ || Object.getPrototypeOf(Gain)).call(this, props));

    _this.connectNode = context.audioContext.createGain();
    _this.connectNode.gain.value = props.amount;
    _this.connectNode.connect(context.connectNode);
    return _this;
  }

  _createClass(Gain, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.connectNode.gain.value = nextProps.amount;
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

  return Gain;
}(_react.Component);

Gain.propTypes = {
  amount: _propTypes2.default.number,
  children: _propTypes2.default.node
};
Gain.defaultProps = {
  amount: 1.0
};
Gain.contextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
Gain.childContextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
exports.default = Gain;