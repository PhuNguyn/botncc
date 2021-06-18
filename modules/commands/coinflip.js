module.exports.config = {
	name: "coinflip",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Chơi Coinflip ",
	commandCategory: "Economy",
	usages: "coinflip [con] [money]",
	cooldowns: 10,
	info: [
		{
			key: 'con',
			prompt: 'ngửa/xấp',
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
				if (isNaN(money)) return api.sendMessage(`Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại #help baucua`, event.threadID, event.messageID);
				if (money < 500)return api.sendMessage(`Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 500 đô!`, event.threadID, event.messageID);  
				if (money > 100000) return api.sendMessage(`Số tiền đặt cược của bạn quá khủng, đặt dưới 100000 đô!`, event.threadID, event.messageID);
					var route = Math.floor(Math.random() * 50);
					if (chon == `ngửa`) {			
						if(route < 20)return api.sendMessage(`Nhà cái: Ngửa\nBạn thắng, toàn bộ ${money} đô thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`,event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money *= 2)), event.messageID);
 						else api.sendMessage(`Nhà cái: Xấp\nBạn thua, toàn bộ ${money} đô bốc hơi\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`,event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (chon == `xấp`){ 
						if(route < 20) return api.sendMessage(`Nhà cái: Xấp\nBạn thắng, toàn bộ ${money} đô thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`,event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money *= 2)), event.messageID);
 						else api.sendMessage(`Nhà cái: Ngửa\nBạn thua, toàn bộ ${money} đô bốc hơi\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else return api.sendMessage(`Vui lòng nhập đúng thông tin đặt cược!`, event.threadID, event.messageID);
 
 
}
