module.exports.config = {
	name: "top",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Kirra",
	description: "Xem top server những người dùng khủng nhất!",
	commandCategory: "Group",
	usages: "top",
	cooldowns: 10,
  	info: [
		{
			key: 'Data',
			prompt: 'money/exp',
			type: 'Văn Bản',
			example: 'money'
		}
       ]
};

module.exports.run = async function({ api,args, event, Currencies }) {
    var {threadID, messageID} = event;
    if (args[0] == "money") {
 				let num = 0;
				let all = await Currencies.getAll(['name', 'money']);
        let count =  !isNaN(args[1]) ? args[1] < 100 ? args[1] : 10 : 10 ;
				all.sort((a, b) => b.money - a.money);
				let msg = {
				  body: `Top ${count} người dùng giàu nhất toàn server.`,
				  mentions: []
				} 
				for (var i = 0; i < count; i++) {
				  num += 1;
				  msg.body += '\n' + num + '. ' + all[i].name + ': ' + all[i].money + ' đô';
				}
				return api.sendMessage(msg, threadID, messageID);
    }
    if (args[0] == "exp") {
 				let num = 0;
				let all = await Currencies.getAll(['name', 'exp']);
        let count =  !isNaN(args[1]) ? args[1] < 100 ? args[1] : 10 : 10 ;
				all.sort((a, b) => b.exp - a.exp);
				let msg = {
				  body: `Top ${count} người dùng tương tác kinh nhất toàn server.`,
				  mentions: []
				} 
				for (var i = 0; i < count; i++) {
				  num += 1;
				  msg.body += '\n' + num + '. ' + all[i].name + ': ' + all[i].exp + ' tin nhắn';
				}
				return api.sendMessage(msg, threadID, messageID);
    }
    else return api.sendMessage("Dùng [#top money] để xem top người dùng giàu nhất hoặc [#top exp] để xem top người dùng tương tác cao nhất!", threadID, messageID);
;
}