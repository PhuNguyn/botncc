module.exports.config = {
    name: "work",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "Có làm thì mới có ăn!",
    commandCategory: "Economy",
    usages: "work",
    cooldowns: 5,
    dependencies: ["parse-ms"],
    envConfig: {
        cooldownTime: 1200000
    }
};

module.exports.run = async ({ event, api, Currencies, __GLOBAL }) => {
    const ms = require("parse-ms");
    let { threadID, messageID } = event;
    let cooldown = __GLOBAL.work.cooldownTime;
    let data = (await Currencies.getData(event.senderID)).workTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        let time = ms(cooldown - (Date.now() - data));
        return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${time.hours} giờ ${time.minutes} phút ${time.seconds} giây!`, event.threadID, event.messageID);
    }
    else {
        let job = [
           "giúp việc",
    "bj cho Mochi",
    "bj cho PhuNguyen",
    "lao công",
    "bán Hoa",
    "thư ký",
    "lái xe",
    "xe ôm",
    "chạy xích lô",
    "bán thịt lợn",
    "bác sĩ",
    "hack fb",
    "Tricker facebook",
    "Marketing facebook",,
    "DDOS website",
    "bán vé số",
    "sửa xe",
    "lập trình",
    "hack facebook",
    "thợ sửa ống nước ( ͡° ͜ʖ ͡°)",
    "đầu bếp",
    "thợ hồ",
    "fake taxi",
    "làm gái nghành",
    "phò đêm",
    "phò ngày",
    "bán hàng online",
    "nội trợ",
    "bán hoa",
    "thợ xăm",
    "chơi Yasuo trong rank và gánh team",,
    "họa sĩ",
    "dọn khách sạn",
    "xe ôm grap",
    "thợ cut tóc",
    "bán hàng online",
    "kinh doanh số di động",
    "phi công",
    "nhặt ve chai",
    "quét rác",
    "ăn hiếp bot",
    "đầu bếp cho cún",
    "đánh giày",
    "dọn tolet",
    "làm đĩ",
    "thông cống",
    "chăm sóc cây cảnh",
    "nuôi gà",
    "thợ xây",
    "đòi nợ thuê",
    "vắt sữa thuê",
    "youtuber",
    "bán hàng online",
    "bán hàng rong",
    "designer",
    "người mẫu"
        ];
        let amount = Math.floor(Math.random() * 1000);
        api.sendMessage(`Bạn đã làm công việc ${job[Math.floor(Math.random() * job.length)]} và đã nhận được số tiền là: ${amount} đô`, threadID, () => {
             Currencies.increaseMoney(event.senderID, parseInt(amount));
             Currencies.setData(event.senderID, options = { workTime: Date.now() });
        }, messageID);
    }
       
}