module.exports.config = {
	name: "fb",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "MewMew",
	description: "Lấy link tải video facebook",
	commandCategory: "media",
	usages: "fb [url]",
	cooldowns: 5,
  info: [
		{
			key: "url",
			prompt: "url video",
			type: 'Văn bản',
			example: 'https://www.facebook.com/marktwooo/videos/769195206993638'
		}
	]
};

module.exports.run = async function({ event, api, args }) {
    var {threadID, messageID} = event;
    var https = require("https");
    var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err)))
)
    short(args.join("")).then(link => api.sendMessage(link,threadID,messageID));
}