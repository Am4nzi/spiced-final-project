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

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sequencer = function (_Component) {
  _inherits(Sequencer, _Component);

  function Sequencer() {
    _classCallCheck(this, Sequencer);

    return _possibleConstructorReturn(this, (Sequencer.__proto__ || Object.getPrototypeOf(Sequencer)).apply(this, arguments));
  }

  _createClass(Sequencer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        bars: this.props.bars,
        resolution: this.props.resolution
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.id = _uuid2.default.v1();
      var master = this.context.getMaster();
      master.bars[this.id] = this.props.bars;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var master = this.context.getMaster();
      master.bars[this.id] = nextProps.bars;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete this.context.getMaster().bars[this.id];
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

  return Sequencer;
}(_react.Component);

Sequencer.propTypes = {
  bars: _propTypes2.default.number,
  children: _propTypes2.default.node,
  resolution: _propTypes2.default.number
};
Sequencer.defaultProps = {
  bars: 1,
  resolution: 16
};
Sequencer.contextTypes = {
  getMaster: _propTypes2.default.func
};
Sequencer.childContextTypes = {
  bars: _propTypes2.default.number,
  getMaster: _propTypes2.default.func,
  resolution: _propTypes2.default.number
};
exports.default = Sequencer;