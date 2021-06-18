module.exports.config = {
	name: "lyrics",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Lấy lời 1 bài hát",
	commandCategory: "Media",
	usages: "lyrics",
	cooldowns: 10,
	dependencies: ['axios'],
  info: [
		{
			key: "Text",
			prompt: "1 tên bài hát bạn muốn lấy lời",
			type: 'Văn bản',
			example: 'Có chắc yêu là đây'
		}
	]
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/lyrics-nct?q=${encodeURIComponent(args.join(" "))}`).replace("%20",""))
  return api.sendMessage(`${res.data.name}\n\n${res.data.lyrics}`, event.threadID);
}
                                                                 