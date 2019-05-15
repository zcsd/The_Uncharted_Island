cc.Class({
    extends: cc.Component,

    properties: {
        nickName: "",
        gender: "boy",
        avatarImgDir: "boy_0",
        coinsOwned: 200,
        materialOwned: null,
        materialUsed: null,
        materialUsedClass: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.materialOwned = new Set();
        this.materialUsed = new Set();
        this.materialUsedClass = new Set();
    },

    start () {

    },
    /*
    update: function (dt) {

    },*/
});
