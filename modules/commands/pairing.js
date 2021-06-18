module.exports.config = {
  name: "pairing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MewMew",
  description: "",
  commandCategory: "general",
  usages: "pairing",
  cooldowns: 20
}

module.exports.run = async ({ api, event,args, Users }) => {
  const request = require("request");
  const axios = require("axios");
  const fs = require("fs-extra");
  if (!args[0]) {
            let all = await Users.getAll(['name', 'userID', 'gender']);
            let data = [];
            let dt = await api.getUserInfo(event.senderID);
            let s = dt[event.senderID].gender;

            for (let u in all) {
              if (s == 1 || s == 0) {
                if (all[u].gender == 2) {
                 if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))   
                }
              } else if (s == 2) {
                if (all[u].gender == 1) {
                  if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))  
                } 
              }
            }
  
            if (data.length == 0) return api.sendMessage("Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
            let e = data[Math.floor(Math.random() * data.length)]
            let d = await api.getUserInfo(e);
            let a = (Math.random() * 50)+50;
            let n = d[e].name
            let b = d[e].gender
          let url = d[e].profileUrl;
            let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?width=512&height=512&access_token=170918394587449|sONjQBBNs316xVD31T-yuL4jfyc`, { responseType: 'arraybuffer' })).data;
            fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(getAvatar, 'utf-8'));     
            api.sendMessage({ body: `Tìm Kiếm Nửa Kia Của Bạn\nTên: ${n}\nGiới Tính: ${(b == 2) ? "Nam" : (b == 1) ? "Nữ" : "Gay"}\nMối Quan Hệ: Độc Thân (có thể)\nĐộ Phù Hợp: ${a.toFixed(2)}%\nInbox: m.me/${e}\nProfile: ${url}`,
                  attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
  }
  else {            
      let all = await Users.getAll(['name', 'userID', 'gender']);
            let data = [];
            let dt = await api.getUserInfo(event.senderID);
            let s = dt[event.senderID].gender;
      if(args[0] == "boy"){
            for (let u in all) {
        if (all[u].gender == 2) {
                if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))   
                }
            }}  
      
      else if(args[0] == "girl"){
            for (let u in all) {
                if (all[u].gender == 1) {
                if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))  
                }
            }}
  
            if (data.length == 0) return api.sendMessage("Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
            let e = data[Math.floor(Math.random() * data.length)]
            let d = await api.getUserInfo(e);
            let a = (Math.random() * 50)+50;
            let n = d[e].name
            let b = d[e].gender
          let url = d[e].profileUrl;
            let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?width=512&height=512&access_token=170918394587449|sONjQBBNs316xVD31T-yuL4jfyc`, { responseType: 'arraybuffer' })).data;
            fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(getAvatar, 'utf-8'));     
            api.sendMessage({ body: `Tìm Kiếm Nửa Kia Của Bạn\nTên: ${n}\nGiới Tính: ${(b == 2) ? "Nam" : (b == 1) ? "Nữ" : "Gay"}\nMối Quan Hệ: Độc Thân (có thể)\nĐộ Phù Hợp: ${a.toFixed(2)}%\nInbox: m.me/${e}\nProfile: ${url}`,
                  attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);}

};