import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types'

class AC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            admin_name:'',//用户名
            //活动控制私有方法
            _activityC: {
                _temId: '',//临时id
                _alertFlag: false,//警告提示窗
                _addFlag: false,//添加活动modal

                _edit: () => {
                    console.log('你点了编辑')
                },
                _delete: () => {
                    let _this = this;
                    //console.log('确认删除！');
                   // console.log('temId:' + this.state._activityC._temId);
                    $.post('receiveData/receiveData.php',{
                        Id:this.state._activityC._temId,
                        addDataKey:"removeActivity"
                    },(data)=>{
                           // console.log(`移除：${data}`);
                            if(data!=1){
                             //   console.log(`移除失败:${data}`);
                                let tp = _this.state.tipsBox;
                                tp.flag = true;
                                tp.text = '删除失败！';
                                let fg = this.state._activityC;
                                fg._alertFlag = false;

                                this.setState({
                                    tipsBox:tp,
                                    _activityC:fg
                                })
                            }else{
                                let tp = _this.state.tipsBox;
                                tp.flag = true;
                                let fg = this.state._activityC;
                                fg._alertFlag = false;

                                tp.text = '删除成功！';
                                this._initShopActivity();
                                this.setState({
                                    tipsBox:tp,
                                    _activityC:fg
                                })
                            }
                    })
                },
                //添加活动
                _add: () => {
                    let addData = $("#form_add").serializeArray();
                    let tem = [];
                    let logo = '';
                    for (let i of addData) {
                        tem.push(i.value);
                    }
                    let sp = this.state.ShopList;
                    for(let i of sp){
                        if(i.name === tem[3]){
                            console.log(i.name);
                            console.log(i.logo);
                            logo = i.logo;
                        }
                    }

                    if (this.state._activityC._check(addData)) {
                        let fd = new FormData();
                        let _this = this;


                        console.log(`shoplist${sp}`);

                        fd.append("title", tem[1]);
                        fd.append("addDataKey",'addActivity');
                        fd.append("url",tem[5]);
                        fd.append("acttime",tem[2]);
                        fd.append("actdesc", tem[4]);
                        fd.append("shopname",tem[3]);
                        fd.append('logo',logo);//商家logo
                        fd.append("actsort",tem[0]);
                        fd.append("banner",$('#banner')[0].files[0]);
                        $.ajax({
                            url: 'receiveData/receiveData.php',
                            type: 'post',
                            processData: false,
                            contentType: false,
                            data: fd,
                            success: function (data) {
                               if(data != 1){
                                   console.log(`发布失败:${data}`);
                                   let tp = _this.state.tipsBox;
                                   tp.text = '发布失败';
                                   tp.flag = true;
                                   _this.setState({
                                       tipsBox:tp
                                   })
                               }else {
                                  // console.log('上传完成');
                                   let tp = _this.state.tipsBox;
                                   let fg = _this.state._activityC;
                                   fg._addFlag = false;
                                   tp.text = '发布完成';
                                   tp.flag = true;
                                   _this.setState({
                                       tipsBox:tp,
                                       _activityC:fg

                                   },()=>{
                                       _this._initShopActivity();
                                   })
                               }
                            }
                        });

                    } else {
                       // console.log('数据有误');
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
            //商户控制私有方法
            _shopC:{
                _add:()=>{
                    let fg = this.state._shopC;
                    fg._addModalFlag = true;

                    this.setState({
                        _shopC:fg
                    })
                },
                //提交请求
                _submit:()=>{
                    let addData = $("#form_add_shop").serializeArray();
                    let tem = [];
                    for (let i of addData) {
                        tem.push(i.value);
                    }
                    if (this.state._activityC._check(addData)) {
                        let _this = this;
                        let fd = new FormData();
                        fd.append("addDataKey","addShopList");
                        fd.append("name",tem[0]);
                        fd.append("phone",tem[1]);
                        fd.append("address",tem[2]);
                        fd.append("desc",tem[3]);
                        fd.append("logo",$('#shop-logo')[0].files[0]);
                        $.ajax({
                            url: 'receiveData/receiveData.php',
                            type: 'post',
                            processData: false,
                            contentType: false,
                            data: fd,
                            success: function (data) {
                                if(data != 1){
                                   // console.log(`添加失败:${data}`);
                                    let tp = _this.state.tipsBox;
                                    let adm = _this.state._shopC;
                                    adm._addModalFlag = false;
                                    tp.text = '添加商户失败';
                                    tp.flag = true;
                                    _this.setState({
                                        tipsBox:tp,
                                        _shopC:adm
                                    })
                                }else {
                                    //console.log('添加商户完成');
                                    let adm = _this.state._shopC;
                                    adm._addModalFlag = false;
                                    let tp = _this.state.tipsBox;
                                    tp.text = '添加商户完成';
                                    tp.flag = true;
                                    _this.setState({
                                        tipsBox:tp,
                                        _shopC:adm

                                    },()=>{
                                        _this._initShopList();
                                    })
                                }
                            }
                        });


                    }else{
                      //  console.log('商户数据有误！');
                    }
                },
                _remove:()=>{
                    let _this = this;
                    $.post('receiveData/receiveData.php',{
                        id:this.state._shopC._temId,
                        addDataKey:"removeShopList"
                    },(data)=>{
                        if(data!=1){
                           // console.log(`移除失败:${data}`);
                            let tp = _this.state.tipsBox;
                            tp.flag = true;
                            tp.text = '删除失败！';
                            let fg = this.state._shopC;
                            fg._alertFlag = false;

                            this.setState({
                                tipsBox:tp,
                                _shopC:fg
                            })
                        }else{
                            let tp = _this.state.tipsBox;
                            tp.flag = true;
                            let fg = this.state._shopC;
                            fg._alertFlag = false;

                            tp.text = '删除成功！';
                           // this._initShopActivity();
                            this.setState({
                                tipsBox:tp,
                                _shopC:fg
                            })
                        }
                    })
                },
                _alertFlag:false,
                _temId:'',
                _addModalFlag:false,//添加modal
            },

            //公告控制私有方法
            _acC:{
                _add:()=>{
                    let fg = this.state._acC;
                    fg._addAcModalFlag = true;
                    this.setState({
                        _acC:fg
                    })
                },
                _addAcModalFlag:false,
                _remove:(id)=>{
                    $.post('receiveData/receiveData.php',{
                        addDataKey:"removeAcActivity",
                        id:id
                    },(data)=>{
                        if(data == 1){
                            let tp = this.state.tipsBox;
                            tp.flag = true;
                            tp.text  = "删除完成";
                            this.setState({
                                tipsBox:tp
                            },()=>{

                            })
                        }else{
                            //console.log(`删除公告：${data}`);
                            let tp = this.state.tipsBox;
                            tp.flag = true;
                            tp.text  = "删除失败";
                            this.setState({
                                tipsBox:tp
                            })
                        }
                    })
                },

                _submit:()=>{
                    let _this = this;
                       let addData = $('#form_add_ac').serializeArray();
                    let tem = [];
                    for (let i of addData) {
                        tem.push(i.value);
                    }
                    if (this.state._activityC._check(addData)) {
                        $.post('receiveData/receiveData.php',{
                            addDataKey:"addAcActivity",
                            title:tem[0],
                            url:tem[1]
                        },(data)=>{
                               // console.log(`添加公告:${data}`);
                                if(data == '1'){
                                    let fg = _this.state._acC;
                                    fg._addAcModalFlag = false;
                                    let tp = _this.state.tipsBox;
                                    tp.text = '添加完成';
                                    tp.flag = true;
                                    this.setState({
                                        tipsBox:tp,
                                        _acC:fg
                                    },()=>{
                                        _this._initAcActivity();
                                    })
                                }
                        })
                    }else{
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
            loadBox:{
                flag:true
            },
            //tabs初始化数据
            ShopActivities: '',
            AcActivity: '',
            IndexActivity: '',
            ShopList: [{},{}],
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

        let _init0= ()=>{
            this._initShopActivity();
            return _init1();
        };
        let _init1 = ()=>{
            console.log('商家列表开始获取');
            this._initShopList();

            return _init2();
        };
        let _init2 = ()=>{
            console.log('开始获取推荐活动');
            this._initIndexActivity();//获取推荐活动
            return _init3();
        };
        let _init3 = ()=>{
            console.log('开始获取用户列表');
            this._initUserList();//获取用户列表
            return _init4();
        };
        let _init4 = ()=>{
            console.log('公告获取开始');
            this._initAcActivity();//获取平台活动
            return _initName;

        };
        let _initName = new Promise(()=>{
            console.log('获取登录名');
            this._getName();//获取登录名

        });
        _init0().catch((e)=>{
            console.log(`发生错误：${e}`)
        });//初始化应用数据

    }
    //初始化商家列表
    _initShopList() {
        //console.log('获取商户列表');
        $.post('returnData/returnData.php',{
            getDataKey:'getShopList'
        },(data)=>{
            console.log('shop:'+JSON.parse(data).toString());

            this.setState({
                ShopList:JSON.parse(data),


            })
        })
    }

    //初始化用户列表
    _initUserList() {
        //  console.log('获取用户列表')
    }

    //初始化推荐活动
    _initIndexActivity() {
        //  console.log('获取推荐活动');
    }

    //初始化平台活动
    _initAcActivity() {
        // console.log('获取AC公告');
        $.post('returnData/returnData.php',{
            getDataKey:'getAcActivity'
        },(data,text)=>{
            //console.log('ac:'+JSON.parse(data));

            data = JSON.parse(data);
            let load = this.state.loadBox;
            load.flag = false;
            this.setState({
                AcActivity:data,
                loadBox:load

            },()=>{
                console.log('初始化完成');
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
                // console.log(data)
            }
            let fg = this.state.renderFlag;
            fg.ActivityFlag = true;
            this.setState(
                {
                    ShopActivities: data,

                }
            )

        });
    }

    //获取用户名
    _getName(){
        $.post('returnData/returnData.php',{
            "getDataKey":"getCookie"
        },(data)=>{
           // console.log(`name:${data}`);
            this.setState({
                admin_name:data+'（当前在线）'
            })
        })
    }
    //退出登录
    _outSign(){
        $.post('receiveData/receiveData.php',{
            addDataKey:"outSign"
        },(data)=>{
            if(data == "ok"){
                location.href = './ac_home.html';
            }else{
                alert('发生错误');
            }
        })
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
                                                <td><img src={row['shoplogo']} className="shop-logo" /> {row['shopId']}</td>
                                                <td>{row['acttime']}</td>
                                                <td>{row['actdesc']}</td>
                                                <td><a href={row['url']} target="_blank">活动链接</a></td>
                                                <td><img src={row['banner']} className="banner"/></td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button className="btn btn-danger" onClick={() => {
                                                            let ac = this.state._activityC;
                                                            ac._alertFlag = true;
                                                            ac._temId = row['Id'];
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
                        <button className="btn btn-success" id="addShopBtn" onClick={()=>this.state._shopC._add()}>添加商户</button>
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
                                                <td><img src={row['logo']} className="shop-logo"/></td>
                                                <td>{row['address']}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={()=>{
                                                        let sp = this.state._shopC;
                                                        sp._alertFlag = true;
                                                        sp._temId = row['Id'];
                                                        this.setState({
                                                            _shopC:sp
                                                        })
                                                    }}>删除</button>
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
                        <button className="btn btn-success" id="addShopBtn" onClick={this.state._acC._add.bind(this)}>添加新公告</button>
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
                                                <td>{row['datetimes']}</td>
                                                <td>{row['url']}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={()=>{
                                                        this.state._acC._remove(row['Id'])
                                                    }}>删除</button>
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

            <nav className="navbar navbar-inverse   " title="bore.iwh1998">
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
                        <li><a type="button" id="dong_love_ywh" href="#">
                                <img src="img/res/user.jpg" className="user-logo"/>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.admin_name}</a>
                        </li>
                        <li><a href="#" className="exit_AD" type="button" onClick={this._outSign.bind(this)}>
                            <span className="glyphicon glyphicon-list-alt"/>&nbsp;&nbsp;&nbsp;&nbsp;退出登录</a>
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
                <p>Copyright &copy; 2018. All rights iwh reserved.</p>
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
    //渲染加载组件
    _renderLoadBox(){
        return (
            <div className="modal show" id="loadBox">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <p>正在加载中···<span className="fa fa-refresh fa-spin"></span></p>
                        </div>
                    </div>
                </div>
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
    //渲染删除商户警告
    _renderDeleShopModal(){
        return (
            <div className="modal show">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <p>确定要删除吗？</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={this.state._shopC._remove.bind(this)}>确定
                            </button>
                            <button className="btn btn-danger" onClick={() => {
                                let sp = this.state._shopC;
                                sp._alertFlag = false;
                                this.setState({_shopC: sp})
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
                                    <label htmlFor="" className="control-label">活动分类：</label>
                                    <label htmlFor="name">选择分类</label>
                                    <select className="form-control" name="add-activity-sort">
                                        <option>游玩</option>
                                        <option >学习</option>
                                        <option >驾考</option>
                                        <option >生活</option>
                                    </select>
                                </div>
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
                                                <option  key={idx}>{sl[row].name}</option>
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
                                           placeholder="上传" required="required" name="add-activity-banner" id='banner'/>
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
    //渲染添加商户
    _renderAddShop(){
        return (
            <div className="modal show" id="modal-add-shop">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>添加新的商户</h4>
                        </div>
                        <div className="modal-body" role="form">
                            <form className="form" method="post" id="form_add_shop">
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">商家名称：</label>
                                    <input type="text" name="add-shop-name" className="form-control"
                                           placeholder="店名" required="required" maxLength="30"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">商家电话：</label>
                                    <input type="number" name="add-shop-phone" className="form-control"
                                           placeholder="联系方式" required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">商家地址</label>
                                    <input type="text" name="add-shop-address" className="form-control"
                                           placeholder="详细地址" required="required"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="" className="control-label">商家简介：</label>
                                    <textarea rows="2" type="text" name="add-activity-desc" className="form-control"
                                              placeholder="请不要超过200字" required="required"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="" className="control-label">logo上传：</label>
                                    <input type="file" className="form-control"
                                           placeholder="上传" required="required" name="add-shop-logo" id='shop-logo'/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className=" text-center">
                                <input type="button" className="btn btn-primary"
                                       onClick={() => {
                                           this.state._shopC._submit()
                                       }} value="确认"/>
                                <input type="button" className="btn btn-default"
                                       onClick={() => {
                                           let fg = this.state._shopC;
                                           fg._addModalFlag = false;
                                           this.setState({
                                               _shopC: fg
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
    //渲染添加公告
    _renderAddAc(){
        return (
            <div className="modal show" id="modal-add-shop">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>添加新的公告</h4>
                        </div>
                        <div className="modal-body" role="form">
                            <form className="form" method="post" id="form_add_ac">
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">活动标题</label>
                                    <input type="text" name="add-ac-title" className="form-control"
                                           placeholder="公告标题" required="required" maxLength="30"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="control-label">超链接</label>
                                    <input type="text" name="add-ac-url" className="form-control"
                                           placeholder="跳转链接" required="required"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className=" text-center">
                                <input type="button" className="btn btn-primary"
                                       onClick={() => {
                                           this.state._acC._submit()
                                       }} value="确认"/>
                                <input type="button" className="btn btn-default"
                                       onClick={() => {
                                           let fg = this.state._acC;
                                           fg._addAcModalFlag = false;
                                           this.setState({
                                               _acC: fg
                                           })
                                       }} value="取消"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.state.loadBox.flag ? this ._renderLoadBox():''}
                {this.state._acC._addAcModalFlag ? this._renderAddAc():''}
                {this.state._shopC._alertFlag ? this._renderDeleShopModal():''}
                {this.state._shopC._addModalFlag ? this._renderAddShop():''}
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