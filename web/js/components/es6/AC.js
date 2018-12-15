import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types'

class AC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //活动控制私有方法
            _activityC: {
                _temId: '',//临时id
                _alertFlag: false,//警告提示窗
                _addFlag: false,//添加活动modal
                _edit: () => {
                    console.log('你点了编辑')
                },
                _delete: () => {
                    console.log('确认删除！');
                    console.log('temId:' + this.state._activityC._temId)
                },
                //添加活动
                _add: () => {
                    let addData = $("#form_add").serializeArray();
                    let tem = [];
                    for (let i of addData) {
                        tem.push(i.value);
                    }
                    if (this.state._activityC._check(addData)) {
                        $.post('receiveData/receiveData.php', {
                            addDataKey:'addActivity',
                            title:tem[0],
                            acttime:tem[1],
                            shopname:tem[2],
                            actdesc:tem[3],
                            url:tem[4]


                        }, (data, text) => {
                                    console.log(data);
                        });
                        console.log(addData);
                        let fg = this.state._activityC;
                        let bg = this.state.tipsBox;
                        bg.flag = true;
                        bg.text = '添加完成';
                        fg._addFlag = false;
                        this.setState({
                            _activity: fg,
                            tipsBox: bg
                        })
                    } else {
                        console.log('数据有误');
                    }

                },
                _check(e) {
                    for (let i of e) {
                        if (i['value'].length <= 0 || i === '') {
                            return false
                        }
                    }
                    return true
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
            addModalFlag: false,//默认添加活动modal
            //render标志
            renderFlag: {
                'ActivityFlag': false,
                'ShopListFlag':false,
                'AcActivityFlag':false,
                'IndexActivity':false,
                'UserListFlag':false
            }

        };
        this._initShopActivity();//获取活动数据
        this._initAcActivity();//获取平台活动
        this._initIndexActivity();//获取推荐活动
        this._initShopList();//获取商户列表
        this._initUserList();//获取用户列表


    }


    //渲染活动tab
    _renderActivity() {
        return (

            <div className="tab-pane fade in active" id="tabs1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button className="btn btn-success" id="addActivityBtn"
                                onClick={() => {
                                    let fg = this.state._activityC;
                                    fg._addFlag = true;
                                    this.setState({
                                        _activity: fg
                                    })
                                }}>发布活动
                        </button>
                    </div>
                    <div className="panel-body">
                        <div className="responsive-table">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="notice_num">序号</th>
                                    <th>活动标题</th>
                                    <th>商家</th>
                                    <th>时间</th>
                                    <th>简介</th>
                                    <th>外链</th>
                                    <th>banner</th>
                                    <th>管理</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.ShopActivities.map((row, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx}</td>
                                                <td>{row['title']}</td>
                                                <td>{row['shopId']}</td>
                                                <td>{row['acttime']}</td>
                                                <td>{row['actdesc']}</td>
                                                <td>{row['url']}</td>
                                                <td>{row['banner']}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button className="btn btn-danger" onClick={() => {
                                                            let ac = this.state._activityC;
                                                            ac._alertFlag = true;
                                                            ac._temId = idx;
                                                            this.setState({
                                                                _activityFlag: ac,

                                                            })
                                                        }}>删除
                                                        </button>
                                                        <button className="btn btn-success"
                                                                onClick={() => this.state._activityC._edit()}>编辑
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }, this)
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    //渲染商户tab
    _renderShopList() {
        return (
            <div className="tab-pane fade in active" id="tabs2">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button className="btn btn-success" id="addShopBtn">添加商户</button>
                    </div>
                    <div className="panel-body">
                        <div className="responsive-table">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="notice_num">序号</th>
                                    <th>商家名称</th>
                                    <th>电话</th>
                                    <th>简介</th>
                                    <th>logo</th>
                                    <th>地址</th>
                                    <th>管理</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.ShopList.map((row, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx}</td>
                                                <td>{row['name']}</td>
                                                <td>{row['phone']}</td>
                                                <td>{row['shopdesc']}</td>
                                                <td>{row['logo']}</td>
                                                <td>{row['address']}</td>
                                                <td>
                                                    <button className="btn btn-danger" >删除</button>
                                                </td>
                                            </tr>
                                        )
                                    }, this)
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    //渲染推荐tab
    _renderIndexActivity() {
        return (
            <div className="tab-pane fade in" id="tabs3">
                3
            </div>
        )
    }

    //渲染用户tab
    _renderUserList() {
        return (
            <div className="tab-pane fade in" id="tabs4">4
            </div>
        )
    }

    //渲染ac公告
    _renderAcActivity() {
        return (
            <div className="tab-pane fade in active" id="tabs5">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button className="btn btn-success" id="addShopBtn">添加新公告</button>
                    </div>
                    <div className="panel-body">
                        <div className="responsive-table">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="notice_num">序号</th>
                                    <th>公告</th>
                                    <th>时间</th>
                                    <th>链接</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.AcActivity.map((row, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx}</td>
                                                <td>{row['title']}</td>
                                                <td>{row['datetime']}</td>
                                                <td>{row['url']}</td>
                                                <td>
                                                    <button className="btn btn-danger" >删除</button>
                                                </td>
                                            </tr>
                                        )
                                    }, this)
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    //渲染导航
    _renderNav() {
        return (

            <nav className="navbar   navbar-default " title="bore.iwh1998">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#miniNav">
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <a className="navbar-brand">AC小程序&nbsp;后台管理</a>
                </div>
                <div className="collapse navbar-collapse" id="miniNav">
                    <ul className="navbar-nav nav">
                        <li className="active"><a href="#tabs1" data-toggle="tab" id="sendActivity" onClick={()=>{

                            this.setState({
                                renderFlag:{
                                    'ActivityFlag': true,
                                    'ShopListFlag':false,
                                    'AcActivityFlag':false,
                                    'IndexActivity':false,
                                    'UserListFlag':false
                                }
                            })
                        }}>
                            <span className="glyphicon glyphicon-bell"/>&nbsp;&nbsp;&nbsp;&nbsp;活动发布</a>
                        </li>
                        <li><a href="#tabs2" data-toggle="tab" id="shopManage"  onClick={()=>{

                            this.setState({
                                renderFlag:{
                                    'ActivityFlag': false,
                                    'ShopListFlag':true,
                                    'AcActivityFlag':false,
                                    'IndexActivity':false,
                                    'UserListFlag':false
                                }
                            })
                        }}>
                            <span className="glyphicon glyphicon-list-alt"/>&nbsp;&nbsp;&nbsp;&nbsp;商户管理</a>
                        </li>
                        <li><a href="#tabs3" data-toggle="tab" id="selectActivity" onClick={()=>{

                            this.setState({
                                renderFlag:{
                                    'ActivityFlag': false,
                                    'ShopListFlag':false,
                                    'AcActivityFlag':false,
                                    'IndexActivity':true,
                                    'UserListFlag':false
                                }
                            })
                        }}>
                            <span className="glyphicon glyphicon-list-alt"/>&nbsp;&nbsp;&nbsp;&nbsp;推荐活动</a>
                        </li>

                        <li><a href="#tabs4" data-toggle="tab" id="userManage" onClick={()=>{

                            this.setState({
                                renderFlag:{
                                    'ActivityFlag': false,
                                    'ShopListFlag':false,
                                    'AcActivityFlag':false,
                                    'IndexActivity':false,
                                    'UserListFlag':true
                                }
                            })
                        }}>
                            <span className="glyphicon glyphicon-list-alt"/>&nbsp;&nbsp;&nbsp;&nbsp;用户管理</a>
                        </li>
                        <li><a href="#tabs5" data-toggle="tab" id="activityManage" onClick={()=>{

                            this.setState({
                                renderFlag:{
                                    'ActivityFlag': false,
                                    'ShopListFlag':false,
                                    'AcActivityFlag':true,
                                    'IndexActivity':false,
                                    'UserListFlag':false
                                }
                            })
                        }}>
                            <span className="glyphicon glyphicon-list-alt"/>&nbsp;&nbsp;&nbsp;&nbsp;AC公告管理</a>
                        </li>

                        <li><a className="exit_AD" type="button">
                            <span className="glyphicon glyphicon-list-alt"/>&nbsp;&nbsp;&nbsp;&nbsp;退出登录</a>
                        </li>
                        <li><a type="button" id="dong_love_ywh">
                                <span
                                    className="glyphicon glyphicon-heart"/>&nbsp;&nbsp;&nbsp;&nbsp;2018.12.12(刷新)</a>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
    //渲染脚部
    _renderFooter() {
        return (
            <footer className="container-fluid footer">
                <p>Copyright &copy; 2018.bore All rights AC校联盟 reserved.</p>
                <p>备案号：皖ICP备18006999号 </p>
            </footer>
        )
    }
    //渲染全局提示
    _renderTips() {
        return (
            <div className="alert-success">
                <button type="button" className="close" onClick={() => {
                    let fg = this.state.tipsBox;
                    fg.flag = false;
                    this.setState({
                        tipsBox: fg
                    })
                }}
                        aria-hidden="true">
                    X
                </button>
                {this.state.tipsBox.text}
            </div>
        )
    }

    //渲染警告窗
    _renderAlert() {
        return (
            <div className="modal show" id="alert">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <p>确定要删除吗？</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={this.state._activityC._delete.bind(this)}>确定
                            </button>
                            <button className="btn btn-danger" onClick={() => {
                                let ac = this.state._activityC;
                                ac._alertFlag = false;
                                this.setState({_activityFlag: ac})
                            }}>取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //渲染添加活动组件
    _renderAddModal() {
        return (
            <div className="modal show" id="modal-add-activity">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>添加活动细节</h4>
                        </div>
                        <div className="modal-body" role="form">
                            <form className="form" method="post" id="form_add">
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">活动标题：</label>
                                    <input type="text" name="add-activity-title" className="form-control"
                                           placeholder="30字以内" required="required" maxLength="30"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">活动时间：</label>
                                    <input type="text" name="add-activity-time" className="form-control"
                                           placeholder="日期" required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">选择活动商家</label>
                                    <select className="form-control" name="add-activity-shop">
                                        {Object.keys(this.state.ShopList).map((row,idx)=>{
                                            let sl = this.state.ShopList;
                                            return(
                                                <option key={idx}>{sl[row].name}</option>
                                            )
                                        },this)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="" className="control-label">活动具体内容：</label>
                                    <textarea rows="2" type="text" name="add-activity-desc" className="form-control"
                                              placeholder="请不要超过200字" required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">活动外链：</label>
                                    <input type="text" name="add-activity-url" className="form-control"
                                           placeholder="url" required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">活动banner：</label>
                                    <input type="file" className="form-control"
                                           placeholder="上传" required="required" name="add-activity-banner"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className=" text-center">
                                <input type="button" className="btn btn-primary"
                                       onClick={() => {
                                           this.state._activityC._add()
                                       }} value="确认"/>
                                <input type="button" className="btn btn-default"
                                       onClick={() => {
                                           let fg = this.state._activityC;
                                           fg._addFlag = false;
                                           this.setState({
                                               _activity: fg
                                           })
                                       }} value="取消"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _renderTabs() {
        return (
            <div className="container-fluid tabs">
                <div className="tab-content">
                    {this.state._activityC._alertFlag ? this._renderAlert() : ''}
                    {this.state.renderFlag.ActivityFlag ? this._renderActivity() : ''}
                    {this.state.renderFlag.ShopListFlag ? this._renderShopList():''}
                    {this.state.renderFlag.IndexActivity ? this._renderIndexActivity():''}
                    {this.state.renderFlag.UserListFlag ? this._renderUserList():''}
                    {this.state.renderFlag.AcActivityFlag ? this._renderAcActivity():''}
                </div>
            </div>
        )
    }

    //初始化商家列表
    _initShopList() {
        console.log('获取商户列表');
        $.post('returnData/returnData.php',{
            getDataKey:'getShopList'
        },(data,text)=>{
            console.log('shop:'+JSON.parse(data));

            this.setState({
                ShopList:JSON.parse(data),

            })
        })
    }

    //初始化用户列表
    _initUserList() {
        console.log('获取用户列表')
    }

    //初始化推荐活动
    _initIndexActivity() {
        console.log('获取推荐活动');
    }

    //初始化平台活动
    _initAcActivity() {
        console.log('获取AC公告');
        $.post('returnData/returnData.php',{
            getDataKey:'getAcActivity'
        },(data,text)=>{
            console.log('ac:'+JSON.parse(data));
            let rg = this.state.renderFlag;
            data = JSON.parse(data);
            this.setState({
                AcActivity:data,

            })
        })
    }

    //初始化商家活动数据
    _initShopActivity() {
        $.post('returnData/returnData.php', {
            getDataKey: 'getShopActivity'
        }, (data, text) => {
            if (data === 'error') {
                console.warn('发生错误：', text);
            } else {
                data = JSON.parse(data);
                console.log(data)
            }
            let fg = this.state.renderFlag;
            fg.ActivityFlag = true;
            this.setState(
                {
                    ShopActivities: data,
                    renderFlag:fg

                }
            )

        });
    }


    render() {
        return (
            <div>
                {this.state.tipsBox.flag ? this._renderTips() : ''}
                {this.state._activityC._addFlag ? this._renderAddModal() : ''}
                {this._renderNav()}
                {this._renderTabs()}
                {this._renderFooter()}
            </div>

        )

    }

}

export default AC