module.exports.config = {
	name: "steal",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "MewMew",
	description: "Trộm yay",
	commandCategory: "Economy",
	usages: "steal",
	cooldowns: 5,
  dependencies: ["parse-ms"],
  envConfig: {
       cooldownTime: 1200000
  }
}

module.exports.run = async ({ event, api, Currencies, __GLOBAL }) => {
    const ms = require("parse-ms");
    let { threadID, messageID, senderID } = event;
    let cooldown = __GLOBAL.steal.cooldownTime;
    let data = (await Currencies.getData(event.senderID)).stealTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
    let time = ms(cooldown - (Date.now() - data));
		return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${time.hours}:${time.minutes}:${time.seconds}!`, threadID);
    }
    else {
			    Currencies.getData(senderID).then((moneydb) => {
          api.getThreadInfo(threadID,async function(err, info) {
          if (err) throw err;
          let victim = info.participantIDs[Math.floor(Math.random() * info.participantIDs.length)];
          let data = await api.getUserInfo(victim);
          let nameV = data[victim].name;
          let dt = await api.getUserInfo(senderID);
          let name = dt[senderID].name;
          if (victim == api.getCurrentUserID() && senderID == victim) return api.sendMessage("Cần lao vi tiên thủ\nNăng cán dĩ đắc thực\nVô vi thực đầu buồi\nThực cứt thế cho nhanh", event.threadID, event.messageID);
					var route = Math.floor(Math.random() * 5);
					if (route > 1 || route == 0) {
						let moneydb = await Currencies.getData(victim);
						var money = Math.floor(Math.random() * 200) + 1;
						if (moneydb <= 0 || moneydb == undefined) return api.sendMessage("Bạn vừa ăn cắp từ một người nghèo. Vì vậy, bạn không có gì.", threadID, messageID);
           else if (moneydb >= money) return api.sendMessage(`Bạn vừa trộm ${money} đô từ 1 thành viên trong nhóm`, threadID, () => {
							Currencies.decreaseMoney(victim, money);
							Currencies.increaseMoney(senderID, parseInt(money));
						}, messageID);
            else if (moneydb < money) return api.sendMessage(`Bạn vừa trộm TẤT CẢ ${moneydb} đô của 1 thành viên trong nhóm`, threadID, () => {
							Currencies.decreaseMoney(victim, parseInt(moneydb));
							Currencies.increaseMoney(senderID, parseInt(moneydb));
						}, messageID);
					}
					else if (route == 1) {
						Currencies.getData(senderID).then(moneydb => {
							if (moneydb <= 0) return api.sendMessage("Bạn không có tiền, HÃY LÀM VIỆC ĐỂ CÓ ĐƯỢC MỘT SỐ TIỀN LÀM VỐN.", threadID, messageID);
              else if (moneydb > 0) return api.sendMessage(`Bạn bị tóm vì tội ăn trộm, mất ${moneydb} đô`, threadID, () => api.sendMessage({body: `Chúc mừng anh hùng ${nameV} tóm gọn tên trộm ${name} và đã nhận được tiền thưởng ${Math.floor(moneydb / 2)} đô`, mentions: [{ tag: nameV, id: victim}, {tag: name, id: senderID}]}, threadID, () => {
								Currencies.decreaseMoney(senderID, moneydb);
								Currencies.increaseMoney(victim, parseInt(Math.floor(moneydb / 2)));
							}), messageID);
						});
					}
				})
        return Currencies.setData(event.senderID, options = { stealTime: Date.now() });
        })
    }
}