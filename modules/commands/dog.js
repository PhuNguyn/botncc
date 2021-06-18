const request = require('request');
const fs = require('fs')
const axios = require('axios')
module.exports.config = {
	name: "dog",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Random ảnh chó",
	commandCategory: "random-img",
	usages: "dog",
	cooldowns: 5,
	dependencies: ['request', 'fs-extra','axios']
};

module.exports.run = ({ event, api }) => {
    axios.get("https://nekos.life/api/v2/img/woof").then(res => {

        let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
        let callback = function () {
          api.sendMessage({
            attachment: fs.createReadStream(__dirname + `/src/cosplay.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/src/cosplay.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/src/cosplay.${ext}`)).on("close", callback);
      });
};

                                                                 