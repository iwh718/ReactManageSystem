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
            //活动控制私有方法
            _activityC: {
                _temId: '', //临时id
                _alertFlag: false, //警告提示窗
                _addFlag: false, //添加活动modal
                _edit: function _edit() {
                    console.log('你点了编辑');
                },
                _delete: function _delete() {
                    console.log('确认删除！');
                    console.log('temId:' + _this.state._activityC._temId);
                },
                //添加活动
                _add: function _add() {
                    var addData = (0, _jquery2.default)("#form_add").serializeArray();
                    var tem = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = addData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var i = _step.value;

                            tem.push(i.value);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    if (_this.state._activityC._check(addData)) {
                        _jquery2.default.post('receiveData/receiveData.php', {
                            addDataKey: 'addActivity',
                            title: tem[0],
                            acttime: tem[1],
                            shopname: tem[2],
                            actdesc: tem[3],
                            url: tem[4]

                        }, function (data, text) {
                            console.log(data);
                        });
                        console.log(addData);
                        var fg = _this.state._activityC;
                        var bg = _this.state.tipsBox;
                        bg.flag = true;
                        bg.text = '添加完成';
                        fg._addFlag = false;
                        _this.setState({
                            _activity: fg,
                            tipsBox: bg
                        });
                    } else {
                        console.log('数据有误');
                    }
                },
                _check: function _check(e) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = e[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var i = _step2.value;

                            if (i['value'].length <= 0 || i === '') {
                                return false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return true;
                }
            },
            //全局提示
            tipsBox: {
                flag: false,
                text: ''
            },
            //tabs初始化数据
            ShopActivities: '',
            AcActivity: '',
            IndexActivity: '',
            ShopList: '',
            UserList: '',
            addModalFlag: false, //默认添加活动modal
            //render标志
            renderFlag: {
                'ActivityFlag': false,
                'ShopListFlag': false,
                'AcActivityFlag': false,
                'IndexActivity': false,
                'UserListFlag': false
            }

        };
        _this._initShopActivity(); //获取活动数据
        _this._initAcActivity(); //获取平台活动
        _this._initIndexActivity(); //获取推荐活动
        _this._initShopList(); //获取商户列表
        _this._initUserList(); //获取用户列表


        return _this;
    }

    //渲染活动tab


    _createClass(AC, [{
        key: '_renderActivity',
        value: function _renderActivity() {
            var _this2 = this;

            return _react2.default.createElement(
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
                            { className: 'btn btn-success', id: 'addActivityBtn',
                                onClick: function onClick() {
                                    var fg = _this2.state._activityC;
                                    fg._addFlag = true;
                                    _this2.setState({
                                        _activity: fg
                                    });
                                } },
                            '\u53D1\u5E03\u6D3B\u52A8'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'responsive-table' },
                            _react2.default.createElement(
                                'table',
                                { className: 'table' },
                                _react2.default.createElement(
                                    'thead',
                                    null,
                                    _react2.default.createElement(
                                        'tr',
                                        null,
                                        _react2.default.createElement(
                                            'th',
                                            { className: 'notice_num' },
                                            '\u5E8F\u53F7'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u6D3B\u52A8\u6807\u9898'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u5546\u5BB6'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u65F6\u95F4'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u7B80\u4ECB'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u5916\u94FE'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            'banner'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u7BA1\u7406'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tbody',
                                    null,
                                    this.state.ShopActivities.map(function (row, idx) {
                                        return _react2.default.createElement(
                                            'tr',
                                            { key: idx },
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                idx
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['title']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['shopId']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['acttime']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['actdesc']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['url']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['banner']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'btn-group' },
                                                    _react2.default.createElement(
                                                        'button',
                                                        { className: 'btn btn-danger', onClick: function onClick() {
                                                                var ac = _this2.state._activityC;
                                                                ac._alertFlag = true;
                                                                ac._temId = idx;
                                                                _this2.setState({
                                                                    _activityFlag: ac

                                                                });
                                                            } },
                                                        '\u5220\u9664'
                                                    ),
                                                    _react2.default.createElement(
                                                        'button',
                                                        { className: 'btn btn-success',
                                                            onClick: function onClick() {
                                                                return _this2.state._activityC._edit();
                                                            } },
                                                        '\u7F16\u8F91'
                                                    )
                                                )
                                            )
                                        );
                                    }, this)
                                )
                            )
                        )
                    )
                )
            );
        }

        //渲染商户tab

    }, {
        key: '_renderShopList',
        value: function _renderShopList() {
            return _react2.default.createElement(
                'div',
                { className: 'tab-pane fade in active', id: 'tabs2' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-heading' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-success', id: 'addShopBtn' },
                            '\u6DFB\u52A0\u5546\u6237'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'responsive-table' },
                            _react2.default.createElement(
                                'table',
                                { className: 'table' },
                                _react2.default.createElement(
                                    'thead',
                                    null,
                                    _react2.default.createElement(
                                        'tr',
                                        null,
                                        _react2.default.createElement(
                                            'th',
                                            { className: 'notice_num' },
                                            '\u5E8F\u53F7'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u5546\u5BB6\u540D\u79F0'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u7535\u8BDD'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u7B80\u4ECB'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            'logo'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u5730\u5740'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u7BA1\u7406'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tbody',
                                    null,
                                    this.state.ShopList.map(function (row, idx) {
                                        return _react2.default.createElement(
                                            'tr',
                                            { key: idx },
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                idx
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['name']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['phone']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['shopdesc']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['logo']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['address']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'button',
                                                    { className: 'btn btn-danger' },
                                                    '\u5220\u9664'
                                                )
                                            )
                                        );
                                    }, this)
                                )
                            )
                        )
                    )
                )
            );
        }

        //渲染推荐tab

    }, {
        key: '_renderIndexActivity',
        value: function _renderIndexActivity() {
            return _react2.default.createElement(
                'div',
                { className: 'tab-pane fade in', id: 'tabs3' },
                '3'
            );
        }

        //渲染用户tab

    }, {
        key: '_renderUserList',
        value: function _renderUserList() {
            return _react2.default.createElement(
                'div',
                { className: 'tab-pane fade in', id: 'tabs4' },
                '4'
            );
        }

        //渲染ac公告

    }, {
        key: '_renderAcActivity',
        value: function _renderAcActivity() {
            return _react2.default.createElement(
                'div',
                { className: 'tab-pane fade in active', id: 'tabs5' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-heading' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-success', id: 'addShopBtn' },
                            '\u6DFB\u52A0\u65B0\u516C\u544A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'responsive-table' },
                            _react2.default.createElement(
                                'table',
                                { className: 'table' },
                                _react2.default.createElement(
                                    'thead',
                                    null,
                                    _react2.default.createElement(
                                        'tr',
                                        null,
                                        _react2.default.createElement(
                                            'th',
                                            { className: 'notice_num' },
                                            '\u5E8F\u53F7'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u516C\u544A'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u65F6\u95F4'
                                        ),
                                        _react2.default.createElement(
                                            'th',
                                            null,
                                            '\u94FE\u63A5'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tbody',
                                    null,
                                    this.state.AcActivity.map(function (row, idx) {
                                        return _react2.default.createElement(
                                            'tr',
                                            { key: idx },
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                idx
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['title']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['datetime']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                row['url']
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'button',
                                                    { className: 'btn btn-danger' },
                                                    '\u5220\u9664'
                                                )
                                            )
                                        );
                                    }, this)
                                )
                            )
                        )
                    )
                )
            );
        }
        //渲染导航

    }, {
        key: '_renderNav',
        value: function _renderNav() {
            var _this3 = this;

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
                                { href: '#tabs1', 'data-toggle': 'tab', id: 'sendActivity', onClick: function onClick() {

                                        _this3.setState({
                                            renderFlag: {
                                                'ActivityFlag': true,
                                                'ShopListFlag': false,
                                                'AcActivityFlag': false,
                                                'IndexActivity': false,
                                                'UserListFlag': false
                                            }
                                        });
                                    } },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-bell' }),
                                '\xA0\xA0\xA0\xA0\u6D3B\u52A8\u53D1\u5E03'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs2', 'data-toggle': 'tab', id: 'shopManage', onClick: function onClick() {

                                        _this3.setState({
                                            renderFlag: {
                                                'ActivityFlag': false,
                                                'ShopListFlag': true,
                                                'AcActivityFlag': false,
                                                'IndexActivity': false,
                                                'UserListFlag': false
                                            }
                                        });
                                    } },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u5546\u6237\u7BA1\u7406'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs3', 'data-toggle': 'tab', id: 'selectActivity', onClick: function onClick() {

                                        _this3.setState({
                                            renderFlag: {
                                                'ActivityFlag': false,
                                                'ShopListFlag': false,
                                                'AcActivityFlag': false,
                                                'IndexActivity': true,
                                                'UserListFlag': false
                                            }
                                        });
                                    } },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u63A8\u8350\u6D3B\u52A8'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs4', 'data-toggle': 'tab', id: 'userManage', onClick: function onClick() {

                                        _this3.setState({
                                            renderFlag: {
                                                'ActivityFlag': false,
                                                'ShopListFlag': false,
                                                'AcActivityFlag': false,
                                                'IndexActivity': false,
                                                'UserListFlag': true
                                            }
                                        });
                                    } },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u7528\u6237\u7BA1\u7406'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#tabs5', 'data-toggle': 'tab', id: 'activityManage', onClick: function onClick() {

                                        _this3.setState({
                                            renderFlag: {
                                                'ActivityFlag': false,
                                                'ShopListFlag': false,
                                                'AcActivityFlag': true,
                                                'IndexActivity': false,
                                                'UserListFlag': false
                                            }
                                        });
                                    } },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0AC\u516C\u544A\u7BA1\u7406'
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
        //渲染脚部

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
        //渲染全局提示

    }, {
        key: '_renderTips',
        value: function _renderTips() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: 'alert-success' },
                _react2.default.createElement(
                    'button',
                    { type: 'button', className: 'close', onClick: function onClick() {
                            var fg = _this4.state.tipsBox;
                            fg.flag = false;
                            _this4.setState({
                                tipsBox: fg
                            });
                        },
                        'aria-hidden': 'true' },
                    'X'
                ),
                this.state.tipsBox.text
            );
        }

        //渲染警告窗

    }, {
        key: '_renderAlert',
        value: function _renderAlert() {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'alert' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header text-center' },
                            _react2.default.createElement(
                                'p',
                                null,
                                '\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-footer' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary', onClick: this.state._activityC._delete.bind(this) },
                                '\u786E\u5B9A'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-danger', onClick: function onClick() {
                                        var ac = _this5.state._activityC;
                                        ac._alertFlag = false;
                                        _this5.setState({ _activityFlag: ac });
                                    } },
                                '\u53D6\u6D88'
                            )
                        )
                    )
                )
            );
        }

        //渲染添加活动组件

    }, {
        key: '_renderAddModal',
        value: function _renderAddModal() {
            var _this6 = this;

            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'modal-add-activity' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header' },
                            _react2.default.createElement(
                                'h4',
                                null,
                                '\u6DFB\u52A0\u6D3B\u52A8\u7EC6\u8282'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body', role: 'form' },
                            _react2.default.createElement(
                                'form',
                                { className: 'form', method: 'post', id: 'form_add' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u6D3B\u52A8\u6807\u9898\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-activity-title', className: 'form-control',
                                        placeholder: '30\u5B57\u4EE5\u5185', required: 'required', maxLength: '30' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u6D3B\u52A8\u65F6\u95F4\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-activity-time', className: 'form-control',
                                        placeholder: '\u65E5\u671F', required: 'required' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: 'name' },
                                        '\u9009\u62E9\u6D3B\u52A8\u5546\u5BB6'
                                    ),
                                    _react2.default.createElement(
                                        'select',
                                        { className: 'form-control', name: 'add-activity-shop' },
                                        Object.keys(this.state.ShopList).map(function (row, idx) {
                                            var sl = _this6.state.ShopList;
                                            return _react2.default.createElement(
                                                'option',
                                                { key: idx },
                                                sl[row].name
                                            );
                                        }, this)
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u6D3B\u52A8\u5177\u4F53\u5185\u5BB9\uFF1A'
                                    ),
                                    _react2.default.createElement('textarea', { rows: '2', type: 'text', name: 'add-activity-desc', className: 'form-control',
                                        placeholder: '\u8BF7\u4E0D\u8981\u8D85\u8FC7200\u5B57', required: 'required' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u6D3B\u52A8\u5916\u94FE\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-activity-url', className: 'form-control',
                                        placeholder: 'url', required: 'required' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u6D3B\u52A8banner\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'file', className: 'form-control',
                                        placeholder: '\u4E0A\u4F20', required: 'required', name: 'add-activity-banner' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-footer' },
                            _react2.default.createElement(
                                'div',
                                { className: ' text-center' },
                                _react2.default.createElement('input', { type: 'button', className: 'btn btn-primary',
                                    onClick: function onClick() {
                                        _this6.state._activityC._add();
                                    }, value: '\u786E\u8BA4' }),
                                _react2.default.createElement('input', { type: 'button', className: 'btn btn-default',
                                    onClick: function onClick() {
                                        var fg = _this6.state._activityC;
                                        fg._addFlag = false;
                                        _this6.setState({
                                            _activity: fg
                                        });
                                    }, value: '\u53D6\u6D88' })
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: '_renderTabs',
        value: function _renderTabs() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid tabs' },
                _react2.default.createElement(
                    'div',
                    { className: 'tab-content' },
                    this.state._activityC._alertFlag ? this._renderAlert() : '',
                    this.state.renderFlag.ActivityFlag ? this._renderActivity() : '',
                    this.state.renderFlag.ShopListFlag ? this._renderShopList() : '',
                    this.state.renderFlag.IndexActivity ? this._renderIndexActivity() : '',
                    this.state.renderFlag.UserListFlag ? this._renderUserList() : '',
                    this.state.renderFlag.AcActivityFlag ? this._renderAcActivity() : ''
                )
            );
        }

        //初始化商家列表

    }, {
        key: '_initShopList',
        value: function _initShopList() {
            var _this7 = this;

            console.log('获取商户列表');
            _jquery2.default.post('returnData/returnData.php', {
                getDataKey: 'getShopList'
            }, function (data, text) {
                console.log('shop:' + JSON.parse(data));

                _this7.setState({
                    ShopList: JSON.parse(data)

                });
            });
        }

        //初始化用户列表

    }, {
        key: '_initUserList',
        value: function _initUserList() {
            console.log('获取用户列表');
        }

        //初始化推荐活动

    }, {
        key: '_initIndexActivity',
        value: function _initIndexActivity() {
            console.log('获取推荐活动');
        }

        //初始化平台活动

    }, {
        key: '_initAcActivity',
        value: function _initAcActivity() {
            var _this8 = this;

            console.log('获取AC公告');
            _jquery2.default.post('returnData/returnData.php', {
                getDataKey: 'getAcActivity'
            }, function (data, text) {
                console.log('ac:' + JSON.parse(data));
                var rg = _this8.state.renderFlag;
                data = JSON.parse(data);
                _this8.setState({
                    AcActivity: data

                });
            });
        }

        //初始化商家活动数据

    }, {
        key: '_initShopActivity',
        value: function _initShopActivity() {
            var _this9 = this;

            _jquery2.default.post('returnData/returnData.php', {
                getDataKey: 'getShopActivity'
            }, function (data, text) {
                if (data === 'error') {
                    console.warn('发生错误：', text);
                } else {
                    data = JSON.parse(data);
                    console.log(data);
                }
                var fg = _this9.state.renderFlag;
                fg.ActivityFlag = true;
                _this9.setState({
                    ShopActivities: data,
                    renderFlag: fg

                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.tipsBox.flag ? this._renderTips() : '',
                this.state._activityC._addFlag ? this._renderAddModal() : '',
                this._renderNav(),
                this._renderTabs(),
                this._renderFooter()
            );
        }
    }]);

    return AC;
}(_react2.default.Component);

exports.default = AC;