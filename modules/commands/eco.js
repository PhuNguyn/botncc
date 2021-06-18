module.exports.config = {
	name: "eco",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Kirra",
	description: "Thiết lập tiền của 1 người dùng",
	commandCategory: "Admin",
	usages: "eco [data] [money] [tag]",
	cooldowns: 5,
	info: [
		{
			key: 'Data',
			prompt: 'set/add/sub',
			type: 'Văn Bản',
			example: 'add'
		},
    		{
			key: 'Money',
			prompt: 'Số tiền',
			type: 'Số',
			example: '1000'
		},
    		{
			key: 'Tag',
			prompt: 'Tag một người nào đó',
			type: 'Văn Bản',
			example: '@Mirai-chan'
		}
	]
};

module.exports.run = async function({ api, event, args, Currencies }) {			
        var mention = Object.keys(event.mentions)[0];
				var content = args[0];
				var moneySet = args[1];
				if (isNaN(moneySet)) return api.sendMessage('Số tiền cần set của bạn không phải là 1 con số!', event.threadID, event.messageID);
				if (content == `set`) { 
				if (!mention){
				if (event.type == "message_reply") {
					api.sendMessage("Đã sửa tiền của "+`${event.messageReply.senderID} thành ` + moneySet+ " đô", event.threadID,() => Currencies.setMoney(event.messageReply.senderID, parseInt(moneySet)), event.messageID)
				}
				else return api.sendMessage("Đã sửa tiền của bản thân thành " + moneySet+ " đô", event.threadID,() => Currencies.setMoney(event.senderID, parseInt(moneySet)), event.messageID) 
				}
				else return api.sendMessage({body: `Bạn đã sửa tiền của ${event.mentions[mention].replace("@", "")} thành ${moneySet} đô.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, () =>Currencies.setMoney(mention, parseInt(moneySet)), event.messageID);
				}
				if (content == `add`) { 
				if (!mention){
				if (event.type == "message_reply") {
					api.sendMessage("Đã thêm tiền của "+`${event.messageReply.senderID} ` + moneySet+ " đô", event.threadID,() => Currencies.increaseMoney(event.messageReply.senderID, parseInt(moneySet)), event.messageID) 
				}
				else return api.sendMessage("Đã thêm tiền của bản thân thành " + moneySet+ " đô", event.threadID,() => Currencies.increaseMoney(event.senderID, parseInt(moneySet)), event.messageID) 
				}
				else return api.sendMessage({body: `Bạn đã thêm tiền của ${event.mentions[mention].replace("@", "")} thành ${moneySet} đô.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, () =>Currencies.increaseMoney(mention, parseInt(moneySet)), event.messageID);
				}
				if (content == `sub`) { 
				if (!mention){
				if (event.type == "message_reply") {
					api.sendMessage("Đã trừ tiền của "+`${event.messageReply.senderID} đi ` + moneySet+ " đô", event.threadID,() => Currencies.decreaseMoney(event.messageReply.senderID, parseInt(moneySet)), event.messageID) 
				}
				else return api.sendMessage("Đã trừ tiền của bản thân thành " + moneySet+ " đô", event.threadID,() => Currencies.decreaseMoney(event.senderID, parseInt(moneySet)), event.messageID)
				}
				else return api.sendMessage({body: `Bạn đã trừ tiền của ${event.mentions[mention].replace("@", "")} thành ${moneySet} đô.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, () =>Currencies.decreaseMoney(mention, parseInt(moneySet)), event.messageID);
				}
}
