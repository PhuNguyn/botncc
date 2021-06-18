module.exports.config = {
    name: "sim",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "Trò chuyện cùng con sim mất dạy nhất quả đất",
    commandCategory: "Chatbot",
    usages: "sim [Text]",
    cooldowns: 5,
    dependencies: ["axios"],
    info: [
        {
            key: "Text",
            prompt: "Lời muốn nói chuyện với em ấy",
            type: 'Văn bản',
            example: 'Hello Em'
        }
    ]
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
    if (!args.join(" ")) return out("Bạn chưa nhập tin nhắn");
    return axios.get(`https://api.simsimi.tk/simsimi/${encodeURIComponent(args.join(" "))}`, {headers: { "User-Agent": "Project Mirai"}}).then(res => api.sendMessage(res.data.out, event.threadID, event.messageID))
}
