module.exports.config = {
	name: "crime",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Làm việc",
	commandCategory: "Economy",
	usages: "crime",
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
    let cooldown = __GLOBAL.crime.cooldownTime;
    let data = (await Currencies.getData(event.senderID)).crimeTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        let time = ms(cooldown - (Date.now() - data));
		return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${time.hours}:${time.minutes}:${time.seconds}!`, event.threadID);
    }
    else {
		let amount = Math.floor(Math.random() * 1000) - 500;
		if (amount < 0) {
        return readFile(__dirname + "/cache/crime.json", (err, data) => {
        if (err) throw err;
        var job = JSON.parse(data).fail
        api.sendMessage(`Bạn đã ${job[Math.floor(Math.random() * job.length)]} và mất: ${amount} đô`, threadID, () => {
             Currencies.increaseMoney(event.senderID, parseInt(amount));
             Currencies.setData(event.senderID, options = { crimeTime: Date.now() });
        }, messageID);
        })
		}
		if (amount == 0) {
        return api.sendMessage(`Bạn bị thiên thần tha hóa nên đã không làm việc xấu`, threadID, () => {
             Currencies.setData(event.senderID, options = { crimeTime: Date.now() });
        }, messageID);
		}
		else {
        return readFile(__dirname + "/cache/crime.json", (err, data) => {
        if (err) throw err;
        var job = JSON.parse(data).success
        api.sendMessage(`Bạn đã ${job[Math.floor(Math.random() * job.length)]} và được: ${amount} đô`, threadID, () => {
             Currencies.increaseMoney(event.senderID, parseInt(amount));
             Currencies.setData(event.senderID, options = { crimeTime: Date.now() });
        }, messageID);
        })
		}
    }
       
}