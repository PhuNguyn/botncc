module.exports.config = {
	name: "nameEvents",
	eventType: ["log:thread-name", "log:thread-icon"],
	version: "1.0.0",
	credits: "CataLicz",
	description: "Listen events"
};

module.exports.run = async function({ api, event, Users, Threads, client,__GLOBAL }) {
	let msg, formPush
	const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
       switch (event.logMessageType) {
	case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Tên không tồn tại",
               
                    newName = event.logMessageData.name || "Tên không tồn tại";
           let data = await api.getUserInfo(event.author)
            let name = await data[event.author].name;
           
            task = "[LOG]" + "\n" + "" + name + " đã thay đổi tên nhóm !" + "\n" + "Tên cũ: " + oldName + "\n" + "Tên mới: " + newName;
           api.sendMessage(task, event.threadID)
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
}}