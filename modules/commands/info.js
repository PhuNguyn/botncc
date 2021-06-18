module.exports.config = {
  name: "info",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "CatalizCS",
  description: "Xem info user/box",
  commandCategory: "Group",
  usages: "info [tag] [id]",
  cooldowns: 5,
  info: [
    {
      key: "tag",
      prompt: "Loại dữ liệu bạn muốn xem.",
      type: "Văn Bản",
      example: "user/box"
    },
    {
      key: "id",
      prompt: "Dữ liệu bạn muốn xem.",
      type: "Văn Bản",
      example: "tag hoặc để trống (user)/threadID hoặc để trống(box)"
    }
  ]
};

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
  const fs = require("fs-extra");
  const axios = require("axios");
  const request = require("request");
  const content = args[0];
  if (!content) return api.sendMessage(`Chưa nhập dữ liệu cần thiết, bạn muốn xem info user hay box ?`, event.threadID,event.messageID);
  if (content.indexOf("user") !== -1) {
    let mentions = Object.keys(event.mentions)[0];
    if (!mentions) {
	if (!args[1]){
	var ct = (event.type == "message_reply") ? event.messageReply.senderID : event.senderID;
	let data = await api.getUserInfo(ct);
      let Avatar = (await axios.get(
        `https://graph.facebook.com/${ct}/picture?width=512&height=512&access_token=701365057372085%7C448576b4fdc8052a9b5ed75d030b6a3d`,
        { responseType: "arraybuffer" }
      )).data;
      fs.writeFileSync(
        __dirname + "/cache/avt.png",
        Buffer.from(Avatar, "utf-8")
      );
      api.sendMessage(
        {
          body:
            "🤓 Tên: " + `${data[ct].name}\n` +
            "🔖 ID: " + `${ct}\n` +
            "✏ Tên người dùng: " + `${data[ct].vanity}\n` +
            "🚻 Giới tính: " + `${data[ct].gender == 2 ? "Nam" : data[ct].gender == 1 ? "Nữ" : "Gay"}\n` +
            "🤖 Kết bạn Bot: " + `${data[ct].isFriend == true ? "✔️" : "❌"}\n` +
            "📎 URL Cá nhân: " + `${data[ct].profileUrl}`,
          attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + `/cache/avt.png`),
        event.messageID
      );
	}
	else{
	let data = await api.getUserInfo(args[1]);
      let Avatar = (await axios.get(
        `https://graph.facebook.com/${args[1]}/picture?width=512&height=512&access_token=701365057372085%7C448576b4fdc8052a9b5ed75d030b6a3d`,
        { responseType: "arraybuffer" }
      )).data;
      fs.writeFileSync(
        __dirname + "/cache/avt.png",
        Buffer.from(Avatar, "utf-8")
      );
      api.sendMessage(
        {
          body:
            "🤓 Tên: " + `${data[args[1]].name}\n` +
            "🔖 ID: " + `${args[1]}\n` +
            "✏ Tên người dùng: " + `${data[args[1]].vanity}\n` +
            "🚻 Giới tính: " + `${data[args[1]].gender == 2 ? "Nam" : data[args[1]].gender == 1 ? "Nữ" : "Gay"}\n` +
            "🤖 Kết bạn Bot: " + `${data[args[1]].isFriend == true ? "✔️" : "❌"}\n` +
            "📎 URL Cá nhân: " + `${data[args[1]].profileUrl}`,
          attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + `/cache/avt.png`),
        event.messageID
      );	
  } 
  } 
	else {
      let data = await api.getUserInfo(mentions);
      let Avatar = (await axios.get(
        `https://graph.facebook.com/${
          Object.keys(event.mentions)[0]
        }/picture?width=512&height=512&access_token=701365057372085%7C448576b4fdc8052a9b5ed75d030b6a3d`,
        { responseType: "arraybuffer" }
      )).data;
      fs.writeFileSync(
        __dirname + "/cache/avt.png",
        Buffer.from(Avatar, "utf-8")
      );
      api.sendMessage(
        {
          body:
            "🤓 Tên: " + `${data[mentions].name}\n` +
            "🔖 ID: " + `${Object.keys(event.mentions)[0]}\n` +
            "✏ Tên người dùng: " + `${data[mentions].vanity}\n` +
            "🚻 Giới tính: " + `${data[mentions].gender == 2 ? "Nam" : data[mentions].gender == 1 ? "Nữ" : "Gay"}\n` +
            "🤖 Kết bạn Bot: " + `${data[mentions].isFriend == true ? "✔️" : "❌"}\n` +
            "📎 URL Cá nhân: " + `${data[mentions].profileUrl}`,
          attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + `/cache/avt.png`),
        event.messageID
      );
    }
  } else if (content.indexOf("box") !== -1) {
    var content_2 = args[1];
    if (!content_2) {
      let threadInfo = await api.getThreadInfo(event.threadID);
      let threadName = threadInfo.threadName;
      let img = threadInfo.imageSrc;
      var nam = 0,
        nu = 0,
        bede = 0;
      threadInfo.userInfo.forEach(e => {
        if (e.gender == "MALE") nam += 1;
        else if (e.gender == "FEMALE") nu += 1;
        else bede += 1;
      });
      if (img == null)
        return api.sendMessage(
          {
            body:
              "🎫 Tên nhóm: " + `${threadName}\n` +
              "🏷 ThreadID: " + `${content_2}\n` +
              "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
              "🤑 Emoji: " + `${threadInfo.emoji}\n` +
              "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔓" : "Đang tắt 🔒" }\n` +
              "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` + 
              "______________________________\n" +
              "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
              "👧 Nữ: " + `${nu}\n` +
              "👦 Nam: " + `${nam}\n` +
              "🏳️‍🌈 Gay: " + `${bede}\n` +
              "👮 QTV: " + `${threadInfo.adminIDs.length}`
          },
          event.threadID
        );
      else {
        var callback = () =>
          api.sendMessage(
            {
              body:
                "🎫 Tên nhóm: " + `${threadName}\n` +
                "🏷 ThreadID: " + `${event.threadID}\n` +
                "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
                "🤑 Emoji: " + `${threadInfo.emoji}\n` +
                "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔓" : "Đang tắt 🔒" }\n` +
                "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` +
                "______________________________\n" +
                "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
                "👧 Nữ: " + `${nu}\n` +
                "👦 Nam: " + `${nam}\n` +
                "🏳️‍🌈 Gay: " + `${bede}\n` +
                "👮 QTV: " + `${threadInfo.adminIDs.length}`,
              attachment: fs.createReadStream(__dirname + "/cache/thread.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/thread.png")
          );
        return request(encodeURI(img))
          .pipe(fs.createWriteStream(__dirname + "/cache/thread.png"))
          .on("close", () => callback());
      }
    } else {
      let threadInfo = await api.getThreadInfo(content_2);
      let threadName = threadInfo.threadName;
      let img = threadInfo.imageSrc;
      var nam = 0,
        nu = 0,
        bede = 0;
      threadInfo.userInfo.forEach(e => {
        if (e.gender == "MALE") nam += 1;
        else if (e.gender == "FEMALE") nu += 1;
        else bede += 1;
      });
      if (img == null)
        return api.sendMessage(
          {
            body:
              "🎫 Tên nhóm: " + `${threadName}\n` +
              "🏷 ThreadID: " + `${content_2}\n` +
              "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
              "🤑 Emoji: " + `${threadInfo.emoji}\n` +
              "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔓" : "Đang tắt 🔒" }\n` +
              "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` +
              "______________________________\n" +
              "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
              "👧 Nữ: " + `${nu}\n` +
              "👦 Nam: " + `${nam}\n` +
              "🏳️‍🌈 Gay: " + `${bede}\n` +
              "👮 QTV: " + `${threadInfo.adminIDs.length}}`
          },
          event.threadID
        );
      else {
        var callback = () =>
          api.sendMessage(
            {
              body:
                "🎫 Tên nhóm: " + `${threadName}\n` +
                "🏷 ThreadID: " + `${event.threadID}\n` +
                "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
                "🤑 Emoji: " + `${threadInfo.emoji}\n` +
                "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔓" : "Đang tắt 🔒" }\n` +
                "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` +
                "______________________________\n" +
                "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
                "👧 Nữ: " + `${nu}\n` +
                "👦 Nam: " + `${nam}\n` +
                "🏳️‍🌈 Gay: " + `${bede}\n` +
                "👮 QTV: " + `${threadInfo.adminIDs.length}`,
              attachment: fs.createReadStream(__dirname + "/cache/thread.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/thread.png")
          );
        return request(encodeURI(img))
          .pipe(fs.createWriteStream(__dirname + "/cache/thread.png"))
          .on("close", () => callback());
      }
    }
  } else return api.sendMessage(`không tồn tại, bạn hãy xem help để biết cách dùng`, event.threadID,event.messageID);
};
