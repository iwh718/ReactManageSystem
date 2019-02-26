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

        var _this2 = _possibleConstructorReturn(this, (AC.__proto__ || Object.getPrototypeOf(AC)).call(this, props));

        _this2.state = {
            admin_name: '', //用户名
            //活动控制私有方法
            _activityC: {
                _temId: '', //临时id
                _alertFlag: false, //警告提示窗
                _addFlag: false, //添加活动modal

                _edit: function _edit() {
                    console.log('你点了编辑');
                },
                _delete: function _delete() {
                    var _this = _this2;
                    //console.log('确认删除！');
                    // console.log('temId:' + this.state._activityC._temId);
                    _jquery2.default.post('receiveData/receiveData.php', {
                        Id: _this2.state._activityC._temId,
                        addDataKey: "removeActivity"
                    }, function (data) {
                        // console.log(`移除：${data}`);
                        if (data != 1) {
                            //   console.log(`移除失败:${data}`);
                            var tp = _this.state.tipsBox;
                            tp.flag = true;
                            tp.text = '删除失败！';
                            var fg = _this2.state._activityC;
                            fg._alertFlag = false;

                            _this2.setState({
                                tipsBox: tp,
                                _activityC: fg
                            });
                        } else {
                            var _tp = _this.state.tipsBox;
                            _tp.flag = true;
                            var _fg = _this2.state._activityC;
                            _fg._alertFlag = false;

                            _tp.text = '删除成功！';
                            _this2._initShopActivity();
                            _this2.setState({
                                tipsBox: _tp,
                                _activityC: _fg
                            });
                        }
                    });
                },
                //添加活动
                _add: function _add() {
                    var addData = (0, _jquery2.default)("#form_add").serializeArray();
                    var tem = [];
                    var logo = '';
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

                    var sp = _this2.state.ShopList;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = sp[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _i = _step2.value;

                            if (_i.name === tem[3]) {
                                console.log(_i.name);
                                console.log(_i.logo);
                                logo = _i.logo;
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

                    if (_this2.state._activityC._check(addData)) {
                        var fd = new FormData();
                        var _this = _this2;

                        console.log('shoplist' + sp);

                        fd.append("title", tem[1]);
                        fd.append("addDataKey", 'addActivity');
                        fd.append("url", tem[5]);
                        fd.append("acttime", tem[2]);
                        fd.append("actdesc", tem[4]);
                        fd.append("shopname", tem[3]);
                        fd.append('logo', logo); //商家logo
                        fd.append("actsort", tem[0]);
                        fd.append("banner", (0, _jquery2.default)('#banner')[0].files[0]);
                        _jquery2.default.ajax({
                            url: 'receiveData/receiveData.php',
                            type: 'post',
                            processData: false,
                            contentType: false,
                            data: fd,
                            success: function success(data) {
                                if (data != 1) {
                                    console.log('\u53D1\u5E03\u5931\u8D25:' + data);
                                    var tp = _this.state.tipsBox;
                                    tp.text = '发布失败';
                                    tp.flag = true;
                                    _this.setState({
                                        tipsBox: tp
                                    });
                                } else {
                                    // console.log('上传完成');
                                    var _tp2 = _this.state.tipsBox;
                                    var fg = _this.state._activityC;
                                    fg._addFlag = false;
                                    _tp2.text = '发布完成';
                                    _tp2.flag = true;
                                    _this.setState({
                                        tipsBox: _tp2,
                                        _activityC: fg

                                    }, function () {
                                        _this._initShopActivity();
                                    });
                                }
                            }
                        });
                    } else {
                        // console.log('数据有误');
                    }
                },
                _check: function _check(e) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var i = _step3.value;

                            if (i['value'].length <= 0 || i === '') {
                                return false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    return true;
                }
            },
            //商户控制私有方法
            _shopC: {
                _add: function _add() {
                    var fg = _this2.state._shopC;
                    fg._addModalFlag = true;

                    _this2.setState({
                        _shopC: fg
                    });
                },
                //提交请求
                _submit: function _submit() {
                    var addData = (0, _jquery2.default)("#form_add_shop").serializeArray();
                    var tem = [];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = addData[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var i = _step4.value;

                            tem.push(i.value);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    if (_this2.state._activityC._check(addData)) {
                        var _this = _this2;
                        var fd = new FormData();
                        fd.append("addDataKey", "addShopList");
                        fd.append("name", tem[0]);
                        fd.append("phone", tem[1]);
                        fd.append("address", tem[2]);
                        fd.append("desc", tem[3]);
                        fd.append("logo", (0, _jquery2.default)('#shop-logo')[0].files[0]);
                        _jquery2.default.ajax({
                            url: 'receiveData/receiveData.php',
                            type: 'post',
                            processData: false,
                            contentType: false,
                            data: fd,
                            success: function success(data) {
                                if (data != 1) {
                                    // console.log(`添加失败:${data}`);
                                    var tp = _this.state.tipsBox;
                                    var adm = _this.state._shopC;
                                    adm._addModalFlag = false;
                                    tp.text = '添加商户失败';
                                    tp.flag = true;
                                    _this.setState({
                                        tipsBox: tp,
                                        _shopC: adm
                                    });
                                } else {
                                    //console.log('添加商户完成');
                                    var _adm = _this.state._shopC;
                                    _adm._addModalFlag = false;
                                    var _tp3 = _this.state.tipsBox;
                                    _tp3.text = '添加商户完成';
                                    _tp3.flag = true;
                                    _this.setState({
                                        tipsBox: _tp3,
                                        _shopC: _adm

                                    }, function () {
                                        _this._initShopList();
                                    });
                                }
                            }
                        });
                    } else {
                        //  console.log('商户数据有误！');
                    }
                },
                _remove: function _remove() {
                    var _this = _this2;
                    _jquery2.default.post('receiveData/receiveData.php', {
                        id: _this2.state._shopC._temId,
                        addDataKey: "removeShopList"
                    }, function (data) {
                        if (data != 1) {
                            // console.log(`移除失败:${data}`);
                            var tp = _this.state.tipsBox;
                            tp.flag = true;
                            tp.text = '删除失败！';
                            var fg = _this2.state._shopC;
                            fg._alertFlag = false;

                            _this2.setState({
                                tipsBox: tp,
                                _shopC: fg
                            });
                        } else {
                            var _tp4 = _this.state.tipsBox;
                            _tp4.flag = true;
                            var _fg2 = _this2.state._shopC;
                            _fg2._alertFlag = false;

                            _tp4.text = '删除成功！';
                            // this._initShopActivity();
                            _this2.setState({
                                tipsBox: _tp4,
                                _shopC: _fg2
                            });
                        }
                    });
                },
                _alertFlag: false,
                _temId: '',
                _addModalFlag: false //添加modal
            },

            //公告控制私有方法
            _acC: {
                _add: function _add() {
                    var fg = _this2.state._acC;
                    fg._addAcModalFlag = true;
                    _this2.setState({
                        _acC: fg
                    });
                },
                _addAcModalFlag: false,
                _remove: function _remove(id) {
                    _jquery2.default.post('receiveData/receiveData.php', {
                        addDataKey: "removeAcActivity",
                        id: id
                    }, function (data) {
                        if (data == 1) {
                            var tp = _this2.state.tipsBox;
                            tp.flag = true;
                            tp.text = "删除完成";
                            _this2.setState({
                                tipsBox: tp
                            }, function () {});
                        } else {
                            //console.log(`删除公告：${data}`);
                            var _tp5 = _this2.state.tipsBox;
                            _tp5.flag = true;
                            _tp5.text = "删除失败";
                            _this2.setState({
                                tipsBox: _tp5
                            });
                        }
                    });
                },

                _submit: function _submit() {
                    var _this = _this2;
                    var addData = (0, _jquery2.default)('#form_add_ac').serializeArray();
                    var tem = [];
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = addData[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var i = _step5.value;

                            tem.push(i.value);
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    if (_this2.state._activityC._check(addData)) {
                        _jquery2.default.post('receiveData/receiveData.php', {
                            addDataKey: "addAcActivity",
                            title: tem[0],
                            url: tem[1]
                        }, function (data) {
                            // console.log(`添加公告:${data}`);
                            if (data == '1') {
                                var fg = _this.state._acC;
                                fg._addAcModalFlag = false;
                                var tp = _this.state.tipsBox;
                                tp.text = '添加完成';
                                tp.flag = true;
                                _this2.setState({
                                    tipsBox: tp,
                                    _acC: fg
                                }, function () {
                                    _this._initAcActivity();
                                });
                            }
                        });
                    } else {
                        // console.log('添加公告失败，数据有误');
                    }
                }
            },
            //全局提示
            tipsBox: {
                flag: false,
                text: ''
            },
            //全局加载组件
            loadBox: {
                flag: true
            },
            //tabs初始化数据
            ShopActivities: '',
            AcActivity: '',
            IndexActivity: '',
            ShopList: [{}, {}],
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

        var _init0 = function _init0() {
            _this2._initShopActivity();
            return _init1();
        };
        var _init1 = function _init1() {
            console.log('商家列表开始获取');
            _this2._initShopList();

            return _init2();
        };
        var _init2 = function _init2() {
            console.log('开始获取推荐活动');
            _this2._initIndexActivity(); //获取推荐活动
            return _init3();
        };
        var _init3 = function _init3() {
            console.log('开始获取用户列表');
            _this2._initUserList(); //获取用户列表
            return _init4();
        };
        var _init4 = function _init4() {
            console.log('公告获取开始');
            _this2._initAcActivity(); //获取平台活动
            return _initName;
        };
        var _initName = new Promise(function () {
            console.log('获取登录名');
            _this2._getName(); //获取登录名
        });
        _init0().catch(function (e) {
            console.log('\u53D1\u751F\u9519\u8BEF\uFF1A' + e);
        }); //初始化应用数据

        return _this2;
    }
    //初始化商家列表


    _createClass(AC, [{
        key: '_initShopList',
        value: function _initShopList() {
            var _this3 = this;

            //console.log('获取商户列表');
            _jquery2.default.post('returnData/returnData.php', {
                getDataKey: 'getShopList'
            }, function (data) {
                console.log('shop:' + JSON.parse(data).toString());

                _this3.setState({
                    ShopList: JSON.parse(data)

                });
            });
        }

        //初始化用户列表

    }, {
        key: '_initUserList',
        value: function _initUserList() {}
        //  console.log('获取用户列表')


        //初始化推荐活动

    }, {
        key: '_initIndexActivity',
        value: function _initIndexActivity() {}
        //  console.log('获取推荐活动');


        //初始化平台活动

    }, {
        key: '_initAcActivity',
        value: function _initAcActivity() {
            var _this4 = this;

            // console.log('获取AC公告');
            _jquery2.default.post('returnData/returnData.php', {
                getDataKey: 'getAcActivity'
            }, function (data, text) {
                //console.log('ac:'+JSON.parse(data));

                data = JSON.parse(data);
                var load = _this4.state.loadBox;
                load.flag = false;
                _this4.setState({
                    AcActivity: data,
                    loadBox: load

                }, function () {
                    console.log('初始化完成');
                });
            });
        }

        //初始化商家活动数据

    }, {
        key: '_initShopActivity',
        value: function _initShopActivity() {
            var _this5 = this;

            _jquery2.default.post('returnData/returnData.php', {
                getDataKey: 'getShopActivity'
            }, function (data, text) {
                if (data === 'error') {
                    console.warn('发生错误：', text);
                } else {
                    data = JSON.parse(data);
                    // console.log(data)
                }
                var fg = _this5.state.renderFlag;
                fg.ActivityFlag = true;
                _this5.setState({
                    ShopActivities: data

                });
            });
        }

        //获取用户名

    }, {
        key: '_getName',
        value: function _getName() {
            var _this6 = this;

            _jquery2.default.post('returnData/returnData.php', {
                "getDataKey": "getCookie"
            }, function (data) {
                // console.log(`name:${data}`);
                _this6.setState({
                    admin_name: data + '（当前在线）'
                });
            });
        }
        //退出登录

    }, {
        key: '_outSign',
        value: function _outSign() {
            _jquery2.default.post('receiveData/receiveData.php', {
                addDataKey: "outSign"
            }, function (data) {
                if (data == "ok") {
                    location.href = './ac_home.html';
                } else {
                    alert('发生错误');
                }
            });
        }
        //渲染活动tab

    }, {
        key: '_renderActivity',
        value: function _renderActivity() {
            var _this7 = this;

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
                                    var fg = _this7.state._activityC;
                                    fg._addFlag = true;
                                    _this7.setState({
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
                                                _react2.default.createElement('img', { src: row['shoplogo'], className: 'shop-logo' }),
                                                ' ',
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
                                                _react2.default.createElement(
                                                    'a',
                                                    { href: row['url'], target: '_blank' },
                                                    '\u6D3B\u52A8\u94FE\u63A5'
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement('img', { src: row['banner'], className: 'banner' })
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
                                                                var ac = _this7.state._activityC;
                                                                ac._alertFlag = true;
                                                                ac._temId = row['Id'];
                                                                _this7.setState({
                                                                    _activityFlag: ac

                                                                });
                                                            } },
                                                        '\u5220\u9664'
                                                    ),
                                                    _react2.default.createElement(
                                                        'button',
                                                        { className: 'btn btn-success',
                                                            onClick: function onClick() {
                                                                return _this7.state._activityC._edit();
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
            var _this8 = this;

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
                            { className: 'btn btn-success', id: 'addShopBtn', onClick: function onClick() {
                                    return _this8.state._shopC._add();
                                } },
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
                                                _react2.default.createElement('img', { src: row['logo'], className: 'shop-logo' })
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
                                                    { className: 'btn btn-danger', onClick: function onClick() {
                                                            var sp = _this8.state._shopC;
                                                            sp._alertFlag = true;
                                                            sp._temId = row['Id'];
                                                            _this8.setState({
                                                                _shopC: sp
                                                            });
                                                        } },
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
            var _this9 = this;

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
                            { className: 'btn btn-success', id: 'addShopBtn', onClick: this.state._acC._add.bind(this) },
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
                                                row['datetimes']
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
                                                    { className: 'btn btn-danger', onClick: function onClick() {
                                                            _this9.state._acC._remove(row['Id']);
                                                        } },
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
            var _this10 = this;

            return _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-inverse   ', title: 'bore.iwh1998' },
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

                                        _this10.setState({
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

                                        _this10.setState({
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

                                        _this10.setState({
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

                                        _this10.setState({
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

                                        _this10.setState({
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
                                { type: 'button', id: 'dong_love_ywh', href: '#' },
                                _react2.default.createElement('img', { src: 'img/res/user.jpg', className: 'user-logo' }),
                                '\xA0\xA0\xA0\xA0',
                                this.state.admin_name
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'exit_AD', type: 'button', onClick: this._outSign.bind(this) },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-list-alt' }),
                                '\xA0\xA0\xA0\xA0\u9000\u51FA\u767B\u5F55'
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
                    'Copyright \xA9 2018. All rights iwh reserved.'
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
            var _this11 = this;

            return _react2.default.createElement(
                'div',
                { className: 'alert-success' },
                _react2.default.createElement(
                    'button',
                    { type: 'button', className: 'close', onClick: function onClick() {
                            var fg = _this11.state.tipsBox;
                            fg.flag = false;
                            _this11.setState({
                                tipsBox: fg
                            });
                        },
                        'aria-hidden': 'true' },
                    'X'
                ),
                this.state.tipsBox.text
            );
        }
        //渲染加载组件

    }, {
        key: '_renderLoadBox',
        value: function _renderLoadBox() {
            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'loadBox' },
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
                                '\u6B63\u5728\u52A0\u8F7D\u4E2D\xB7\xB7\xB7',
                                _react2.default.createElement('span', { className: 'fa fa-refresh fa-spin' })
                            )
                        )
                    )
                )
            );
        }
        //渲染警告窗

    }, {
        key: '_renderAlert',
        value: function _renderAlert() {
            var _this12 = this;

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
                                        var ac = _this12.state._activityC;
                                        ac._alertFlag = false;
                                        _this12.setState({ _activityFlag: ac });
                                    } },
                                '\u53D6\u6D88'
                            )
                        )
                    )
                )
            );
        }
        //渲染删除商户警告

    }, {
        key: '_renderDeleShopModal',
        value: function _renderDeleShopModal() {
            var _this13 = this;

            return _react2.default.createElement(
                'div',
                { className: 'modal show' },
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
                                { className: 'btn btn-primary', onClick: this.state._shopC._remove.bind(this) },
                                '\u786E\u5B9A'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-danger', onClick: function onClick() {
                                        var sp = _this13.state._shopC;
                                        sp._alertFlag = false;
                                        _this13.setState({ _shopC: sp });
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
            var _this14 = this;

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
                                        '\u6D3B\u52A8\u5206\u7C7B\uFF1A'
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: 'name' },
                                        '\u9009\u62E9\u5206\u7C7B'
                                    ),
                                    _react2.default.createElement(
                                        'select',
                                        { className: 'form-control', name: 'add-activity-sort' },
                                        _react2.default.createElement(
                                            'option',
                                            null,
                                            '\u6E38\u73A9'
                                        ),
                                        _react2.default.createElement(
                                            'option',
                                            null,
                                            '\u5B66\u4E60'
                                        ),
                                        _react2.default.createElement(
                                            'option',
                                            null,
                                            '\u9A7E\u8003'
                                        ),
                                        _react2.default.createElement(
                                            'option',
                                            null,
                                            '\u751F\u6D3B'
                                        )
                                    )
                                ),
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
                                            var sl = _this14.state.ShopList;
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
                                        placeholder: '\u4E0A\u4F20', required: 'required', name: 'add-activity-banner', id: 'banner' })
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
                                        _this14.state._activityC._add();
                                    }, value: '\u786E\u8BA4' }),
                                _react2.default.createElement('input', { type: 'button', className: 'btn btn-default',
                                    onClick: function onClick() {
                                        var fg = _this14.state._activityC;
                                        fg._addFlag = false;
                                        _this14.setState({
                                            _activity: fg
                                        });
                                    }, value: '\u53D6\u6D88' })
                            )
                        )
                    )
                )
            );
        }
        //渲染添加商户

    }, {
        key: '_renderAddShop',
        value: function _renderAddShop() {
            var _this15 = this;

            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'modal-add-shop' },
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
                                '\u6DFB\u52A0\u65B0\u7684\u5546\u6237'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body', role: 'form' },
                            _react2.default.createElement(
                                'form',
                                { className: 'form', method: 'post', id: 'form_add_shop' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u5546\u5BB6\u540D\u79F0\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-shop-name', className: 'form-control',
                                        placeholder: '\u5E97\u540D', required: 'required', maxLength: '30' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u5546\u5BB6\u7535\u8BDD\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'number', name: 'add-shop-phone', className: 'form-control',
                                        placeholder: '\u8054\u7CFB\u65B9\u5F0F', required: 'required' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: 'name' },
                                        '\u5546\u5BB6\u5730\u5740'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-shop-address', className: 'form-control',
                                        placeholder: '\u8BE6\u7EC6\u5730\u5740', required: 'required' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u5546\u5BB6\u7B80\u4ECB\uFF1A'
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
                                        'logo\u4E0A\u4F20\uFF1A'
                                    ),
                                    _react2.default.createElement('input', { type: 'file', className: 'form-control',
                                        placeholder: '\u4E0A\u4F20', required: 'required', name: 'add-shop-logo', id: 'shop-logo' })
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
                                        _this15.state._shopC._submit();
                                    }, value: '\u786E\u8BA4' }),
                                _react2.default.createElement('input', { type: 'button', className: 'btn btn-default',
                                    onClick: function onClick() {
                                        var fg = _this15.state._shopC;
                                        fg._addModalFlag = false;
                                        _this15.setState({
                                            _shopC: fg
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
        //渲染添加公告

    }, {
        key: '_renderAddAc',
        value: function _renderAddAc() {
            var _this16 = this;

            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'modal-add-shop' },
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
                                '\u6DFB\u52A0\u65B0\u7684\u516C\u544A'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body', role: 'form' },
                            _react2.default.createElement(
                                'form',
                                { className: 'form', method: 'post', id: 'form_add_ac' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u6D3B\u52A8\u6807\u9898'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-ac-title', className: 'form-control',
                                        placeholder: '\u516C\u544A\u6807\u9898', required: 'required', maxLength: '30' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: '', className: 'control-label' },
                                        '\u8D85\u94FE\u63A5'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', name: 'add-ac-url', className: 'form-control',
                                        placeholder: '\u8DF3\u8F6C\u94FE\u63A5', required: 'required' })
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
                                        _this16.state._acC._submit();
                                    }, value: '\u786E\u8BA4' }),
                                _react2.default.createElement('input', { type: 'button', className: 'btn btn-default',
                                    onClick: function onClick() {
                                        var fg = _this16.state._acC;
                                        fg._addAcModalFlag = false;
                                        _this16.setState({
                                            _acC: fg
                                        });
                                    }, value: '\u53D6\u6D88' })
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.loadBox.flag ? this._renderLoadBox() : '',
                this.state._acC._addAcModalFlag ? this._renderAddAc() : '',
                this.state._shopC._alertFlag ? this._renderDeleShopModal() : '',
                this.state._shopC._addModalFlag ? this._renderAddShop() : '',
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