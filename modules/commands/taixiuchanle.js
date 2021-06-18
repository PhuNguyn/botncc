	module.exports.config = {
	name: "tx",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Chơi tài xỉu",
	commandCategory: "Economy",
	usages: "tx [con] [money]",
	cooldowns: 10,
	info: [
		{
			key: 'con',
			prompt: 'tài/xỉu/chẵn/lẻ/bộba',
			type: 'Văn Bản',
			example: 'tài'
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
        if (!chon) return api.sendMessage(`Vui lòng nhập đủ thông tin`, event.threadID, event.messageID);
				var choose = "";
				if (!money)return api.sendMessage("Chưa nhập số tiền đặt cược!", event.threadID, event.messageID);
				if (money > moneydb) return api.sendMessage(`Số tiền của bạn không đủ`, event.threadID, event.messageID);
				if (money == "all") {
					if (moneydb < 100000) var money = moneydb
					else var money = "100000";
				}
				if (isNaN(money))return api.sendMessage(`Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại /help baucua`, event.threadID, event.messageID);
				if (money < 500)return api.sendMessage(`Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 500 đô!`, event.threadID, event.messageID);
				if (money > 500000) return api.sendMessage(`Số tiền đặt cược của bạn quá khủng, đặt dưới 500000 đô!`, event.threadID, event.messageID);
          
				if (chon == "bộba")
					choose = 0;
				else if (chon == "tài")
					choose = 1;
				else if (chon == "xỉu")
					choose = 2;
				else if (chon == "chẵn")
					choose = 3;
				else if (chon == "lẻ")
					choose = 4;
				else
					return api.sendMessage(`Vui lòng nhập đúng tài hoặc xỉu, chi tiết tại #help tx`, event.threadID, event.messageID);

				// Generation
				let number = [];
        var i = 0;
				for (i = 0; i < 4; i++) {
					number[i] = Math.floor(Math.random() * 6) +1;
				}
				//bộ ba
				if (choose == 0) {
					if (Currencies.boba(number) && choose == 0) {
						money *= 9;
						api.sendMessage(`Kết quả là một bộ ba: ${number[0]} - ${number[1]} - ${number[2]}\nBạn đã chọn Bộ ba, bạn đã thắng với số tiền được nhân lên 9: ${money * 9} đô\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					} else {
						return api.sendMessage(`Đây không phải bộ ba: ${number[0]} - ${number[1]} - ${number[2]}\nBạn đã mất trắng số tiền: ${money} đô :'(\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					} 
				}
				//tài xỉu
				if (choose == 1 || choose == 2) {
					if (Currencies.taixiu(number) == "tài" && choose == 1) {
						money *= 1.5;
						api.sendMessage(`Kết quả là Tài\nBạn đã chọn tài, bạn đã thắng với số tiền được nhân lên 1.5: ${money} đô\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (Currencies.taixiu(number) == "xỉu" && choose == 2) {
						money *= 1.5;
						api.sendMessage(`Kết quả là Xỉu\nBạn đã chọn xỉu, bạn đã thắng với số tiền được nhân lên 1.5: ${money} đô\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					} else {
						api.sendMessage(`Kết quả là ${Currencies.taixiu(number)}\nBạn đã mất trắng số tiền: ${money} đô\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
				}
				//chẵn lẻ
				if (choose == 3 || choose == 4) {
					if (Currencies.chanle(number) == "chẵn" && choose == 3) {
						money *= 1;
						api.sendMessage(`Kết quả là Chẵn\nBạn đã chọn chẵn, bạn đã thắng với số tiền là: ${money} đô\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (Currencies.chanle(number) == "lẻ" && choose == 4) {
						money *= 1;
						api.sendMessage(`Kết quả là Lẻ\nBạn đã chọn lẻ, bạn đã thắng với số tiền là: ${money} đô\nSố tiền hiện tại của bạn là: ${moneydb + money} đô`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else {
						api.sendMessage(`Kết quả là ${Currencies.chanle(number)}\nBạn đã mất trắng số tiền: ${money} đô\nSố tiền hiện tại của bạn là: ${moneydb - money} đô`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);}  
				  }      
}
