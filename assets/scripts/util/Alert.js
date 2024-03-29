var Alert = {
    _alert: null,           // prefab
    _titleLabel:    null,   //标题
    _detailLabel:   null,   // 内容
    _alertBg:       null,
    _cancelButton:  null,   // 确定按钮
    _enterButton:   null,   // 取消按钮
    _enterCallBack: null,   // 回调事件
    _animSpeed:     0.3,    // 动画速度
};

/**
 * typeNum:        窗口类型 int
 * titleString:    标题 string 类型.
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * needCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/

Alert.show = function (typeNum, titleString, detailString, enterCallBack, needCancel, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (Alert._alert != undefined) return;

    // 
    Alert._animSpeed = animSpeed ? animSpeed : Alert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("Alert", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        Alert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 255), cc.scaleTo(Alert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 0), cc.scaleTo(Alert._animSpeed, 2.0)), cbFadeOut);

        // 获取子节点
        Alert._alertBg = cc.find("alertBackground", alert);
        Alert._titleLabel = cc.find("alertBackground/titleLabel", alert).getComponent(cc.Label);
        Alert._detailLabel = cc.find("alertBackground/detailLabel", alert).getComponent(cc.Label);
        Alert._cancelButton = cc.find("alertBackground/cancelButton", alert);
        Alert._enterButton = cc.find("alertBackground/enterButton", alert);

        Alert._alertBg.setScale(typeNum);

        if (typeNum != 1) {
            cc.find("alertBackground/titleLabel", alert).setScale(1/typeNum);
            cc.find("alertBackground/detailLabel", alert).setScale(1/typeNum);
            Alert._cancelButton.setScale(1/typeNum);
            Alert._enterButton.setScale(1/typeNum);
        }
        


        // 添加点击事件
        Alert._enterButton.on('click', self.onButtonClicked, self);
        Alert._cancelButton.on('click', self.onButtonClicked, self);

        // 父视图
        Alert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(titleString, detailString, enterCallBack, needCancel, animSpeed);
        
    });

    // 参数
    self.configAlert = function (titleString, detailString, enterCallBack, needCancel, animSpeed) {

        // 回调
        Alert._enterCallBack = enterCallBack;

        // 标题
        Alert._titleLabel.string = titleString;
        // 内容
        Alert._detailLabel.string = detailString;
        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) { // 显示
            Alert._cancelButton.active = true;
        } else {  // 隐藏
            Alert._cancelButton.active = false;
            Alert._enterButton.x = 0;
        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        //cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.pauseSystemEvents(true);
        Alert._alert.position = cc.Vec2(0, 0);
        Alert._alert.setScale(2);
        Alert._alert.opacity = 0;
        Alert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        //cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.pauseSystemEvents(true);
        Alert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        //cc.eventManager.resumeTarget(Alert._alert, true);
        Alert._alert.resumeSystemEvents(true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        self.startFadeOut();
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        Alert._alert.destroy();
        Alert._alert.removeFromParent();
        Alert._enterCallBack = null;
        Alert._alert = null;
        Alert._titleLabel = null;
        Alert._detailLabel = null;
        Alert._cancelButton = null;
        Alert._enterButton = null;
        Alert._animSpeed = 0.3;
    };
};

window.Alert = Alert; // must add for WeChat build
