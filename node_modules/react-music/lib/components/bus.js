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

var Bus = function (_Component) {
  _inherits(Bus, _Component);

  function Bus(props, context) {
    _classCallCheck(this, Bus);

    var _this = _possibleConstructorReturn(this, (Bus.__proto__ || Object.getPrototypeOf(Bus)).call(this, props));

    _this.connectNode = context.audioContext.createGain();
    _this.connectNode.gain.value = props.gain;
    _this.connectNode.connect(context.connectNode);
    return _this;
  }

  _createClass(Bus, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var master = this.context.getMaster();
      master.busses[this.props.id] = this.connectNode;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var master = this.context.getMaster();
      delete master.busses[this.props.id];

      this.connectNode.gain.value = nextProps.gain;
      master.busses[nextProps.id] = this.connectNode;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.connectNode.disconnect();
      delete this.context.getMaster().busses[this.props.id];
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

  return Bus;
}(_react.Component);

Bus.propTypes = {
  children: _propTypes2.default.node,
  gain: _propTypes2.default.number,
  id: _propTypes2.default.string.isRequired
};
Bus.defaultProps = {
  gain: 0.5
};
Bus.contextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func
};
Bus.childContextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func
};
exports.default = Bus;