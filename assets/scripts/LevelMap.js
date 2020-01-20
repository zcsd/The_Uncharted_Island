cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: {
            default: null,
            type: cc.Label
        },

        coinLabel: cc.Label,

        avatarSprite: {
            default: null,
            type: cc.Sprite
        },

        standSprite: {
            default: null,
            type: cc.Sprite
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var player = cc.find('player').getComponent('Player');
        this.nameLabel.string = player.nickName;
        this.coinLabel.string = player.coinsOwned.toString();

        if (player.coinsOwned > 151) {
            G.isQuizOpen = false;
        }
        else {
            G.isQuizOpen = true;
        }

        var self = this;
        // load image from resource folder
        cc.loader.loadRes(player.avatarImgDir, cc.SpriteFrame, function (err, spriteFrame) {
            self.standSprite.spriteFrame = spriteFrame;
        });
        cc.loader.loadRes(player.avatarImgDir + '_s', cc.SpriteFrame, function (err, spriteFrame) {
            self.avatarSprite.spriteFrame = spriteFrame;
        });
        
        if(G.isNewUser){
            console.log("fsdfsdf");
            Alert.show(1.5, "欢迎来到无尽之岛", "无尽之岛包含三个关卡，请从扩散实验开始玩起，赚取你的金币吧。如金币不够，可以做测验得金币哦。", null, false);
        }
        
        //socket, username, sequenceID, stage, actionType, operatedItem, rewardType, rewardQty, totalCoins
        //insertNewAction(G.globalSocket, G.user.username, G.sequenceCnt, "levelmap", "system", "na", "na", 0, G.user.coins);
        G.isNewUser = false;
        this.levelAnimation();
    },

    start () {

    },

    levelAnimation: function () {
        var levelNode = null;
        if(!G.isDiffDone){
            levelNode = "Canvas/diffButton/Background";
            console.log("diff");
        }else if (!G.isOsmoDone){
            cc.find("Canvas/diffButton/done").active = true;
            levelNode = "Canvas/osButton/Background";
            console.log("osmo");
        }else if(!G.isBanaDone){
            cc.find("Canvas/diffButton/done").active = true;
            cc.find("Canvas/osButton/done").active = true;
            levelNode = "Canvas/bananaButton/Background";
        }else{
            cc.find("Canvas/diffButton/done").active = true;
            cc.find("Canvas/osButton/done").active = true;
            cc.find("Canvas/bananaButton/done").active = true;
        }
        
        var seq = cc.repeatForever(cc.sequence(cc.scaleTo(1.5, 0.9), cc.scaleTo(1.5, 0.95)));
        cc.find(levelNode).runAction(seq);

        var sunSeq = cc.repeatForever(cc.sequence(cc.moveBy(2, cc.v2(-8, -3)), cc.moveBy(2, cc.v2(8, 3))));
        cc.find("Canvas/cloudsSunBg").runAction(sunSeq);

        var quizSeq = cc.repeatForever(cc.sequence(cc.scaleTo(1.5, 0.85), cc.scaleTo(1.5, 0.95)));

        if(G.isQuizOpen){
            cc.find('Canvas/quizButton').getComponent(cc.Button).interactable = true;
            cc.find('Canvas/quizButton').runAction(quizSeq);
        }else{
            cc.find('Canvas/quizButton').getComponent(cc.Button).interactable = false;
        }
    },

    goToDiffScene: function () {
        cc.director.loadScene("DoDiffusionTest");
    },

    goToOsmosisScene: function () {
        cc.director.loadScene("DoOsmosisTest");
    },

    goToBananaScene: function () {
        cc.director.loadScene("SaveBananaTree");
    },

    goToQuizScene: function () {
        cc.director.loadScene("DoQuiz");
    },
    /*
    update: function (dt) {
    },*/
});
