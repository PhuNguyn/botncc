module.exports.config = {
  name: "out",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "HungCho",
  description: "Thay icon nhs chat.",
  commandCategory: "Admin",
  usages: "boxemoji [icon]",
  cooldowns: 3
};
module.exports.run = async function({ api, event, Users, Threads, client,__GLOBAL, args }) {
           const moment = require("moment-timezone");
            var today = new Date()
            if (event.messageReply) {name = event.messageReply.body}
            else name = args[0]
            let hii = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
            var date = today.getDate()+ '/' +(today.getMonth()+1)+ '/' +today.getFullYear();
            var msg = "Đã nhận lệnh rời khỏi nhóm này từ Admin !\nThời gian: " + hii + "-" + date;
            var hihi = __GLOBAL.settings.ADMINBOT;
            var admin = hihi.split(" ");
            let threadInfo = await api.getThreadInfo(name || event.threadID)
            let namee = threadInfo.threadName;
            var msgg = "Bot đã rời nhóm " + "'" + namee + "'" + "với lệnh out !";
           
     if (!name) {
      api.sendMessage(msg, event.threadID, () => api.removeUserFromGroup(api.getCurrentUserID(), event.threadID));
     }
     else api.sendMessage(msg, name, () => api.removeUserFromGroup(api.getCurrentUserID(), name));
    for(let i in admin){
  api.sendMessage(msgg, admin[i]);
}

}