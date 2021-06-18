module.exports.config = {
  name: "calladmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kirra",
  description: "",
  commandCategory: "Group",
  usages: "calladmin [Text]",
  cooldowns: 5,
  info: [
    {
      key: "Text",
      prompt: "Lời muốn nói",
      type: "Văn bản",
      example: "ê"
    }
  ]
};

module.exports.run = async function({ api, event, args }) {
      var {senderID, threadID} = event;
      var content = args.join(" ");
      const moment = require("moment-timezone");
      let threadInfo = await api.getThreadInfo(threadID);
      let userInfo = await api.getUserInfo(senderID);
      let threadName = threadInfo.threadName;
      let userName = userInfo[senderID].name;
      return api.sendMessage(`[🔊${userName}-${senderID}🔊]\n\n${content}\n\n Từ nhóm: ${threadName}-${threadID}`+ "\nLúc: " + moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")+"\nNgày: " + moment.tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),100043510592039);
}
