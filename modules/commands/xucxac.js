module.exports.config = {
	name: "xucxac",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "MewMew",
	description: "",
	commandCategory: "games",
	usages: "xucxac",
	cooldowns: 5
}

module.exports.run = async ({ event, api, args }) => {
var dice = [1,2,3,4,5,6];
var times = args[0];
if (isNaN(times)) return api.sendMessage("Vui lòng điền số lần gieo!",event.threadID);
times = parseInt(times);
if(times <= 0 || !times) {
	time = 1;
}
var data = 0,num = 0,list = "";
for (let e = 0 ; e < times; e++) {
	var random = dice[Math.floor(Math.random() * dice.length)];
	data += random;
	num = num + 1;
	list += `Xúc xắc ${num}: ${random} nút\n`;
}
return api.sendMessage(`${(times > 50) ? 'Số lần gieo chỉ được dưới 50' : list} Tổng: ${data}`,event.threadID);
}