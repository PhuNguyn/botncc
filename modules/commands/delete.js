module.exports.config = {
	name: "delete",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Kirra",
	description: "Xóa",
	commandCategory: "Admin",
	usages: "delete [data] [id]",
	cooldowns: 0
};

module.exports.run = async function({ api, event, args, Threads, Users }) {
if (args[0] == "thread")  {         
    if (!args[1]) {
		return api.removeUserFromGroup(api.getCurrentUserID(),event.threadID, () => 
                                      Threads.delData(event.threadID));
        }
     else {
        api.removeUserFromGroup(api.getCurrentUserID(),args[1], () =>  {       
                                Threads.delData(args[1]); 
        api.sendMessage("Đã xóa!",event.ThreadID,event.messageID)})
        }
}
if (args[0] == "user") return Users.delData(args[1], ()=> api.sendMessage("Đã xóa!",event.ThreadID,event.messageID));
}