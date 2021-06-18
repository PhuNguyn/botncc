const request = require('request');
const fs = require('fs')
      var ytdl = require("ytdl-core");
    
module.exports.config = {
  name: "fbget",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kirra",
  description: "",
  commandCategory: "media",
  usages: "/fbget audio/video [link video] dạng 1000xxxx/videos/idviddeo",
  cooldowns: 10,
  dependencies: ["request","fs", "node-cmd","facebook-tools"]
};

module.exports.run = async({api,event,args,client,Users,__GLOBAL,Currencies}) => {
var facebookTools = require('facebook-tools');
const name = args[1];
 videoObj = await facebookTools.getVideoUrl(name);
  switch (args[0]) {
  case "video": {
 var callback = () => api.sendMessage({body: ``,attachment: fs.createReadStream(__dirname + "/src/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/src/1.mp4"), event.messageID); 
      return request(encodeURI(`${videoObj.sdLink}`)).pipe(fs.createWriteStream(__dirname+'/src/1.mp4')).on('close',() => callback());
  break;
}

  case "audio": {
  	var callback = () => api.sendMessage({body: ``,attachment: fs.createReadStream(__dirname + "/src/1.m4a")}, event.threadID, () => fs.unlinkSync(__dirname + "/src/1.m4a"), event.messageID); 
      return request(encodeURI(`${videoObj.sdLink}`)).pipe(fs.createWriteStream(__dirname+'/src/1.m4a')).on('close',() => callback());
    break;

}
}}