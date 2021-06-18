	module.exports.config = {
	name: "sl",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Chơi slot",
	commandCategory: "Economy",
	usages: "sl [money]",
	cooldowns: 10,
	info: [
    		{
			key: 'money',
			prompt: 'Số tiền',
			type: 'Số',
			example: '1000'
		}
	]
};		

module.exports.run = async ({ event, api, args, Currencies }) => {
      const slotItems = ["🍇", "🍉", "🍊", "🍏", "7⃣", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽"];
		  const moneydb = (await Currencies.getData(event.senderID)).money;
				var money = args[0];
				let win = false;
				if (money == "all") {
					if (moneydb < 100000) var money = moneydb;
					else var money = "100000";
				}
				if (isNaN(money)) return api.sendMessage(`Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại #help sl`, event.threadID, event.messageID);
				if (!money) return api.sendMessage("Chưa nhập số tiền đặt cược!", event.threadID, event.messageID);
				if (money > moneydb) return api.sendMessage(`Số tiền của bạn không đủ`, event.threadID, event.messageID);
				if (money < 500) return api.sendMessage(`Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 500 đô!`, event.threadID, event.messageID);
                if (money > 100000) return api.sendMessage(`Số tiền đặt cược của bạn quá khủng, đặt dưới 100000 đô!`, event.threadID, event.messageID);

        let number = [];
        var i = 0;
				for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
				if (number[0] == number[1] && number[1] == number[2]) {
					money *= 9;
					win = true;
				}
				else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
					money *= 2;
					win = true;
				}
				(win) ? api.sendMessage(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nBạn đã thắng, toàn bộ ${money} đô thuộc về bạn.\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID) : api.sendMessage(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nBạn đã thua, toàn bộ ${money} đô đã biến mất.\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
}
