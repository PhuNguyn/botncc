module.exports.config = {
	name: "joinEvents",
	eventType: ["log:subscribe"],
	version: "1.0.0",
	credits: "SpermLord",
	description: "Listen events",
	dependencies: ["request", "fs-extra"]
};

module.exports.run = async function({ api, event, __GLOBAL, client, Users }) {
  const request = require("request");
  const fs = require("fs-extra");
  const axios = require("axios");
  const moment = require("moment-timezone");
  
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    let {senderID, threadID} = event;
    senderID = parseInt(senderID);
    threadID = parseInt(threadID);
    let threadInfo = await api.getThreadInfo(threadID);
	let threadName = threadInfo.threadName;
    let data = await api.getUserInfo(event.author);  
		api.changeNickname(`[ ${__GLOBAL.settings.PREFIX} ] • ${(!__GLOBAL.settings.BOTNAME) ? "Made by CatalizCS and SpermLord" : __GLOBAL.settings.BOTNAME}`, threadID, api.getCurrentUserID());
        api.sendMessage(`Kết nối thành công!`, threadID);
		//api.sendMessage(`Connected successfully! This bot was made by CatalizCS and SpermLord\nThank you for using our products, have fun UwU <3`, event.threadID);
	  api.sendMessage({body:`[✅] Bot đã được ${data[event.author].name}-${event.author} thêm vào nhóm: ` + threadName + `-${threadID}\nLúc: ` + moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss") + "\nNgày: "+ moment.tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),mentions:[{ tag: data[event.author].name, id: event.author }]}, 100000529101886);	
      api.muteThread(threadID, -1);
  }
	else {
		const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
		let threadInfo = await api.getThreadInfo(event.threadID),
			threadName = threadInfo.threadName,
			settings = client.threadSetting.get(event.threadID) || {},
			dirGif = __dirname + `/cache/joinGif/`,
			msg, formPush;
		var mentions = [], nameArray = [], memLength = [];
    
    
		for (var i = 0; i < event.logMessageData.addedParticipants.length; i++) {
			let id = event.logMessageData.addedParticipants[i].userFbId;
			let userName = event.logMessageData.addedParticipants[i].fullName;
			nameArray.push(userName);
			mentions.push({ tag: userName, id });
			memLength.push(threadInfo.participantIDs.length - i);
		}
		memLength.sort((a, b) => a - b);
		(typeof settings.customJoin == "undefined") ? msg = "Welcome aboard {name}.\nChào mừng đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} của nhóm 🥳" : msg = settings.customJoin;
		msg = msg
		.replace(/\{name}/g, nameArray.join(', '))
		.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
		.replace(/\{soThanhVien}/g, memLength.join(', '))
		.replace(/\{threadName}/g, threadName);
		if (existsSync(dirGif)) mkdirSync(dirGif, { recursive: true });
		if (existsSync(dirGif + `${event.threadID}.gif`)) formPush = { body: msg, attachment: createReadStream(dirGif + `${event.threadID}.gif`), mentions }
		else formPush = { body: msg, mentions }
		return api.sendMessage(formPush, event.threadID);
	}
}