	module.exports.config = {
	name: "roul",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Chơi cò quay",
	commandCategory: "Economy",
	usages: "roul [color] [money]",
	cooldowns: 10,
	info: [
		{
			key: 'color',
			prompt: 'cam/đỏ/xanh/vàng/tím/đen',
			type: 'Văn Bản',
			example: 'cam'
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
  	var { threadID, messageID, senderID } = event
		    const moneydb = (await Currencies.getData(event.senderID)).money;
				var color = args[0]
  			var money = args[1]
				if (!color || !money) return api.sendMessage(`Bạn chưa nhập thông tin đặt cược!`, threadID, messageID);
				if (!money || !color) return api.sendMessage("Sai format", threadID, messageID);
				if (money > moneydb) return api.sendMessage(`Số tiền của bạn không đủ`, threadID, messageID);
				if (money == "all") {
					if (moneydb < 100000) var money = moneydb
					else var money = "100000";
				}
				if (isNaN(money))return api.sendMessage(`Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại #help roul`, event.threadID, event.messageID);
				if (money > 100000) return api.sendMessage(`Số tiền đặt cược của bạn quá khủng, dưới 100000 đô`, threadID, messageID);
				if (money < 500) return api.sendMessage(`Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 500 đô`, threadID, messageID);
				var check = (num) => (num == 0) ? '😡' : (num % 2 == 0 && num % 6 != 0 && num % 10 != 0) ? '♥️' : (num % 3 == 0 && num % 6 != 0) ? '💚' : (num % 5 == 0 && num % 10 != 0) ? '💛' : (num % 10 == 0) ? '💜' : '🖤️';
				let random = Math.floor(Math.random() * 50);
				if (color == "o" || color == "cam") color = 0;
				else if (color == "r" || color == "đỏ") color = 1;
				else if (color == "e" || color == "xanh") color = 2;
				else if (color == "y" || color == "vàng") color = 3;
				else if (color == "v" || color == "tím") color = 4;
				else if (color == "b" || color == "đen") color = 5;
				else return api.sendMessage("Bạn chưa nhập thông tin cá cược!, đen [x0.5] đỏ [x1.25] xanh [x1.5] vàng [x1.75] tím [x2] cam [x4]", threadID, messageID);

        if (color == 0 && check(random) == '💙') api.sendMessage(`Bạn đã chọn màu 😡, bạn đã thắng với số tiền được nhân lên 4: ${money * 4} đô\nSố tiền hiện tại của bạn là: ${moneydb + (money * 4)} đô.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 4)), messageID);
				else if (color == 1 && check(random) == '♥️') api.sendMessage(`Bạn đã chọn màu ♥️, bạn đã thắng với số tiền nhân lên 2: ${money * 2} đô\nSố tiền hiện tại của bạn là: ${moneydb + (money * 2)} đô.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 2)), messageID);
				else if (color == 2 && check(random) == '💚') api.sendMessage(`Bạn đã chọn màu 💚, bạn đã thắng với số tiền nhân lên 1.75: ${money * 1.75} đô\nSố tiền hiện tại của bạn là: ${moneydb + money} đô.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money)), messageID);
				else if (color == 3 && check(random) == '💛') api.sendMessage(`Bạn đã chọn màu 💛, bạn đã thắng với số tiền nhân lên 1.5: ${money * 1.5} đô\nSố tiền hiện tại của bạn là: ${moneydb + (money * 0.5)} đô.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 0.5)), messageID);
				else if (color == 4 && check(random) == '💜') api.sendMessage(`Bạn đã chọn màu 💜, bạn đã thắng với số tiền nhân lên 1.25: ${money * 1.25} đô\nSố tiền hiện tại của bạn là: ${moneydb + money * 0.2} đô.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money* 0.2)), messageID);
				else if (color == 5 && check(random) == '🖤️') api.sendMessage(`Bạn đã chọn màu 🖤️, bạn đã thắng với số tiền nhân lên 0.5: ${money * 0.5} đô\nSố tiền hiện tại của bạn là: ${moneydb + (money * 0.1)} đô.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 0.1)), messageID);
				else api.sendMessage(`Màu ${check(random)}\nBạn đã mất trắng số tiền: ${money} đô :'(\nSố tiền hiện tại của bạn là: ${moneydb - money} đô.`, threadID, () => Currencies.decreaseMoney(senderID, parseInt(money)), messageID);
}
