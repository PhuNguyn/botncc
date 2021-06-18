module.exports.config = {
	name: "kbb",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Chơi kéo búa bao",
	commandCategory: "Economy",
	usages: "kbb [kéo/búa/bao] [money]",
	cooldowns: 10,
	info: [
		{
			key: 'con',
			prompt: 'kéo/búa/bao',
			type: 'Văn Bản',
			example: 'bao'
		},
    		{
			key: 'money',
			prompt: 'Số tiền',
			type: 'Số',
			example: '1000'
		}
	]
};		

module.exports.run = async ({ event, api, args, Currencies }) => {
		  const moneydb = (await Currencies.getData(event.senderID)).money;
				var chon = args[0];
				var money = args[1];
				if (!money) return api.sendMessage(`Vui lòng nhập đủ thông tin`, event.threadID, event.messageID);
				if (money > moneydb)return api.sendMessage(`Số tiền của bạn không đủ`, event.threadID, event.messageID); 
				if (money == "all") {
					if (moneydb < 100000) var money = moneydb;
					else var money = "100000";
				}
				if (isNaN(money)) return api.sendMessage(`Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại #help kbb`, event.threadID, event.messageID);
				if (money < 500)return api.sendMessage(`Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 500 đô!`, event.threadID, event.messageID);  
				if (money > 100000) return api.sendMessage(`Số tiền đặt cược của bạn quá khủng, đặt dưới 100000 đô!`, event.threadID, event.messageID);
					var route = Math.floor(Math.random() * 50);
					if (chon == `búa`) {			
						if(route < 10)return api.sendMessage(`Nhà cái: Kéo\nBạn thắng, toàn bộ ${money} đô thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`,event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money *= 2)), event.messageID);
						else if (route > 9 && route < 31) return api.sendMessage(`Nhà cái: Búa\nHòa, toàn bộ ${money} đô trả về bạn`, event.threadID, event.messageID);
						else api.sendMessage(`Nhà cái: Bao\nBạn thua, toàn bộ ${money} đô đã biến mất\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`,event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (chon == `bao`){ 
						if(route < 10) return api.sendMessage(`Nhà cái: Búa\nBạn thắng, toàn bộ ${money} đô thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`,event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money *= 2)), event.messageID);
						else if (route > 9 && route < 31)return api.sendMessage(`Nhà cái: Bao\nHòa, toàn bộ ${money} đô trả về bạn`, event.threadID, event.messageID)
						else api.sendMessage(`Nhà cái: Kéo\nBạn thua, toàn bộ ${money} đô đã biến mất\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (chon == `kéo`) {
						if(route < 10)return api.sendMessage(`Nhà cái: Bao\nBạn thắng, toàn bộ ${money} đô thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money *= 2)), event.messageID);
						else if (route > 9 && route < 31) return api.sendMessage(`Nhà cái: Kéo\nHòa, toàn bộ ${money} đô trả về bạn`, event.threadID, event.messageID);
						else api.sendMessage(`Nhà cái: Búa\nBạn thua, toàn bộ ${money} đô đã biến mất\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);    
					}; 
}
