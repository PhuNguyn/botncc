module.exports = function({ __GLOBAL, api, Users, Threads, Currencies, client }) {
	const logger = require("../../utils/log.js");
	return async function({ event }) {
		try {
			if (__GLOBAL.settings.autoCreateDB == false) return;
			const { senderID, threadID, isGroup } = event;
			var settings = {};
			if (!isGroup) return;
			if (!(await Threads.getData(threadID))) {
				const threadInfo = await api.getThreadInfo(threadID);
				await Threads.createData(threadID, { name: threadInfo.name, settings, threadInfo });
				logger(`New Thread: ${threadInfo.name} - ${threadID}`, "[ DATABASE ]")
			}
			if (!(await Users.getData(senderID)) ) {
				const data = (await api.getUserInfo(senderID))
				const name = data[senderID].name;
                const gender = data[senderID].gender;
				await Users.createData(senderID, { name, gender });
				logger(`New User: ${name} - ${senderID}`, "[ DATABASE ]")
				await Currencies.createData(senderID, { name });
				logger(`New Currency: ${name} - ${senderID}`, "[ DATABASE ]")
			}
		}

		catch(e) {
			console.log(e);
		}
	}
}