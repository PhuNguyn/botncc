module.exports.config = {
	name: "restart",
	version: "0.0.1-beta",
	hasPermssion: 2,
	credits: "Kirra",
	description: "",
	commandCategory: "system",
	usages: "",
	dependencies: ["fs-extra","fs","merge-images","path","wait-on","canvas","node-cmd"],
	cooldowns: 0,
	envConfig: {
		unsendMessageAfter: 5
	}
};


module.exports.run = async function ({ event, api, client, utils, Currencies, Threads }) {
 let {messageID, senderID, threadID, body } = event;
return api.sendMessage("Bot sẽ khởi động lại ngay lập tức !", threadID, () => require("node-cmd").run("pm2 restart 0"), messageID);
}