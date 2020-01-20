window.G = {
    globalSocket: null,
    user: null,
    sequenceCnt: 0,
    isNewUser: false,
    isDiffDone: false,
    isOsmoDone: false,
    isBanaDone: false,
    isQuizOpen: false,
}

window.insertNewAction = function(socket, username, sequenceID, stage, actionType,
    operatedItem, rewardType, rewardQty, totalCoins){

    var activity = {username: username, sequenceID: sequenceID, stage: stage, actionType: actionType,
                    operatedItem: operatedItem, rewardType: rewardType, rewardQty: rewardQty, totalCoins: totalCoins};
   
    //console.log(activity);
    socket.emit("newAction", activity);
    G.sequenceCnt = sequenceID + 1;
};