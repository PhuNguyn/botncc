module.exports.config = {
	name: "leaveEvents",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "SpermLord",
	description: "Listen events"
};

module.exports.run = async function({ api, event, Users, Threads, client }) {
	let msg, formPush
	const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
        const moment = require("moment-timezone");
        let threadInfo = await api.getThreadInfo(event.threadID);
        let threadName = threadInfo.threadName;
        let data = await api.getUserInfo(event.author);  
        api.sendMessage("[❌] Bot " +  `${(event.author != api.getCurrentUserID()) ? `đã bị ${data[event.author].name}-${event.author} kick khỏi nhóm: ` : "đã rời khỏi nhóm: "}` + threadName + `-${event.threadID}` + "\nLúc: " + moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")+"\nNgày: " + moment.tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),100000529101886) 
        Threads.delData(event.threadID);
    }
	let settings = client.threadSetting.get(event.threadID) || {};//(await Threads.getData(event.threadID)).settings;
	let name = (await Users.getData(event.logMessageData.leftParticipantFbId)).name || (await api.getUserInfo(event.logMessageData.leftParticipantFbId))[event.logMessageData.leftParticipantFbId].name
	let type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
	(typeof settings.customLeave == "undefined") ? msg = "{name} Đã {type} khỏi nhóm" : msg = settings.customLeave;
	msg = msg
	.replace(/\{name}/g, name)
	.replace(/\{type}/g, type);
	let dirGif = __dirname + `/cache/leaveGif/`;
	if (existsSync(dirGif)) mkdirSync(dirGif, { recursive: true })
	if (existsSync(dirGif + `${event.threadID}.gif`)) formPush = { body: msg, attachment: createReadStream(dirGif + `${event.threadID}.gif`) }
	else formPush = { body: msg }
	return api.sendMessage(formPush, event.threadID);
}