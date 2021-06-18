module.exports.config = {
	name: "slut",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "làm",
	commandCategory: "Economy",
	usages: "slut",
	cooldowns: 5,
	dependencies: ["parse-ms"],
	envConfig: {
	   cooldownTime: 1200000
	}
};

module.exports.run = async ({ event, api, Currencies, __GLOBAL }) => {
    const { readFile,readFileSync, createReadStream, createWriteStream, unlinkSync } = require("fs-extra");
    const ms = require("parse-ms");
    
    let { threadID, messageID } = event;
    let cooldown = __GLOBAL.slut.cooldownTime;
    let data = (await Currencies.getData(event.senderID)).slutTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        let time = ms(cooldown - (Date.now() - data));
		return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${time.hours}:${time.minutes}:${time.seconds}!`, event.threadID);
    }
	
    else {
		
        let amount = Math.floor(Math.random() * 1000) - 500;
		if (amount < 0) {
        return api.sendMessage(`Bạn đã đi khách nhưng bị boom nên phải trả tiền phòng mất: ${amount} đô`, threadID, () => {
             Currencies.increaseMoney(event.senderID, parseInt(amount));
             Currencies.setData(event.senderID, options = { slutTime: Date.now() });
        }, messageID);
		}
		if (amount == 0) {
        return api.sendMessage(`Bạn đi ăn xin nhưng không được đồng nào`, threadID, () => {
             Currencies.increaseMoney(event.senderID, parseInt(amount));
             Currencies.setData(event.senderID, options = { slutTime: Date.now() });
        }, messageID);
		}
		else {
        return api.sendMessage(`Bạn đã đi khách và nhận được số tiền là: ${amount} đô`, threadID, () => {
             Currencies.increaseMoney(event.senderID, parseInt(amount));
             Currencies.setData(event.senderID, options = { slutTime: Date.now() });
        }, messageID);
		}
    }
       
}