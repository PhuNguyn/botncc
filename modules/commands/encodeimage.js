module.exports.config = {
	name: "eimage",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "MewMew",
	description: "",
	commandCategory: "media",
	usages: "eimage",
	cooldowns: 5,
	dependencies: ['path', 'fs-extra','axios']
};

module.exports.run = async function({ event, api }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const path = require("path");
    const axios = require("axios");
	const fs = require("fs-extra");
	var base64_encode = (file) => fs.readFileSync(file,'base64');
	if(event.type == "message_reply"){
		if (event.messageReply.attachments[0].type == "photo"){
			try{
				var data = (await axios.get(event.messageReply.attachments[0].url,{responseType: 'stream'})).data;
				data.pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close",
				() => fs.writeFile(__dirname + `/cache/encode.txt`, base64_encode(__dirname + `/cache/image.png`),
				() => api.sendMessage({attachment: fs.createReadStream(__dirname + `/cache/encode.txt`)},event.threadID, 
				() => fs.unlink(__dirname + `/cache/encode.txt`,
				() => fs.unlinkSync(__dirname + `/cache/image.png`)))))
			} catch (e) {
			api.sendMessage(`${e.name}: ${e.message}`,event.threadID);
			}
		} else return api.sendMessage(`reply image!`,event.threadID);
	} else return api.sendMessage(`reply image!`,event.threadID);
}

                                                                 