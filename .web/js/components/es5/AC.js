'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AC = function (_React$Component) {
    _inherits(AC, _React$Component);

    function AC(props) {
        _classCallCheck(this, AC);

        var _this = _possibleConstructorReturn(this, (AC.__proto__ || Object.getPrototypeOf(AC)).call(this, props));

        _this.state = {
            ShopActivities: '',
            AcActivity: '',
            IndexActivity: '',
            ShopList: '',
            UserList: ''

        };
        _this._initShopActivity(); //获取活动数据
        _this._initAcActivity(); //获取平台活动
        _this._initIndexActivity(); //获取推荐活动
        _this._initShopList(); //获取商户列表
        _this._initUserList(); //获取用户列表


        return _this;
    }

    _createClass(AC, [{
        key: '_renderNav',
        value: function _renderNav() {
            return _react2.default.createElement(
                'nav',
                { className: 'navbar   navbar-default ', title: 'bore.iwh1998' },
                _react2.default.createElement(
                    'div',
                    { className: 'navbar-header' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '#miniNav' },
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'navbar-brand' },
                        'AC\u5C0F\u7A0B\u5E8F\xA0\u540E\u53F0\u7BA1\u7406'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'collapse navbar-collapse', id: 'miniNav' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'navbar-nav nav' },
                        _react2.default.createElement(
                            'li',
                            { className: 'active' },
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs1', 'data-toggle': 'tab', id: 'sendActivity' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-bell' }),
                                '\xA0\xA0\xA0\xA0\u5E73\u53F0\u6D3B\u52A8\u53D1\u5E03'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs2', 'data-toggle': 'tab', id: 'shopManage' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u5546\u6237\u7BA1\u7406'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs3', 'data-toggle': 'tab', id: 'selectActivity' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u63A8\u8350\u6D3B\u52A8'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs4', 'data-toggle': 'tab', id: 'userManage' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u7528\u6237\u7BA1\u7406'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs5', 'data-toggle': 'tab', id: 'activityManage' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u6D3B\u52A8\u7BA1\u7406'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'exit_AD', type: 'button' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u9000\u51FA\u767B\u5F55'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { type: 'button', id: 'dong_love_ywh' },
                                _react2.default.createElement('span', {
                                    className: 'glyphicon glyphicon-heart' }),
                                '\xA0\xA0\xA0\xA02018.12.12(\u5237\u65B0)'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: '_renderFooter',
        value: function _renderFooter() {
            return _react2.default.createElement(
                'footer',
                { className: 'container-fluid footer' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Copyright \xA9 2018.bore All rights AC\u6821\u8054\u76DF reserved.'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '\u5907\u6848\u53F7\uFF1A\u7696ICP\u590718006999\u53F7 '
                )
            );
        }
    }, {
        key: '_renderTips',
        value: function _renderTips() {}
    }, {
        key: '_renderAddModal',
        value: function _renderAddModal() {}
    }, {
        key: '_renderTabs',
        value: function _renderTabs() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid tabs' },
                _react2.default.createElement(
                    'div',
                    { className: 'tab-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'tab-pane fade in active', id: 'tabs1' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel panel-default' },
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-heading' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-success', id: 'addActivityBtn' },
                                    '\u53D1\u5E03\u6D3B\u52A8'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-body' },
                                _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.ShopActivities } })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tab-pane fade in', id: 'tabs2' },
                        '2'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tab-pane fade in', id: 'tabs3' },
                        '3'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tab-pane fade in', id: 'tabs4' },
                        '4'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tab-pane fade in', id: 'tabs5' },
                        '5'
                    )
                )
            );
        }
        //初始化商家列表

    }, {
        key: '_initShopList',
        value: function _initShopList() {
            console.log('获取商户列表11111111111');
        }
        //初始化用户列表

    }, {
        key: '_initUserList',
        value: function _initUserList() {
            console.log('获取用户列表111111111111111111111');
        }
        //初始化推荐活动

    }, {
        key: '_initIndexActivity',
        value: function _initIndexActivity() {
            console.log('获取推荐活动');
            console.log('hihih');
        }
        //初始化平台活动

    }, {
        key: '_initAcActivity',
        value: function _initAcActivity() {
            console.log('获取平台活动');
        }
        //初始化商家活动数据

    }, {
        key: '_initShopActivity',
        value: function _initShopActivity() {
            var _this2 = this;

            console.log('获取商户活动111111');
            _jquery2.default.post('./returnData.php', {}, function (data, text) {

                console.log(data);
                _this2.setState({
                    ShopActivities: data
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this._renderNav(),
                this._renderTabs(),
                this._renderFooter()
            );
        }
    }]);

    return AC;
}(_react2.default.Component);

exports.default = AC;