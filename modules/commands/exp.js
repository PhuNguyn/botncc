
module.exports.config = {
	name: "exp",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Kirra",
	description: "Chỉnh sửa điểm tương tác của ai đó hoặc bản thân",
	commandCategory: "Admin",
	usages: "exp [data] [point] [tag]",
	cooldowns: 5,
	info: [
		{
			key: 'Data',
			prompt: 'add/del',
			type: 'Văn Bản',
			example: 'add'
		},
    		{
			key: 'Point',
			prompt: 'Số điểm',
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
  	let {threadID, senderID, messageID } = event;
    
            var mention = Object.keys(event.mentions)[0];
            var point = args[0];
			var score = args[1];
            if (isNaN(score) && point != "del" && point != "add") return api.sendMessage("Vui lòng nhập đủ thông tin", threadID, messageID);
            if (!mention){ 
			let data = (await Currencies.getData(`${senderID}`));
			if (!data) return;
			let exp = parseInt(data["exp"]);
            if (point == "del") {
                if (!score) {
				api.sendMessage("Đã xóa điểm tương tác của bản thân", threadID, messageID);
				exp -= exp;
				await Currencies.setData(senderID, options = { exp });
                }
				else {				
                api.sendMessage("Đã xóa điểm tương tác của bản thân đi " + score + " điểm", event.threadID, event.messageID);
				exp -= parseInt(score);
				await Currencies.setData(senderID, options = { exp });
				}	
			}
			if (point == "add") {   
				api.sendMessage("Đã thêm điểm tương tác cho bản thân " + score + " điểm", event.threadID, event.messageID);
				exp += parseInt(score);
				await Currencies.setData(senderID, options = { exp });
				}
				return;
			}
			else {
				let data = (await Currencies.getData(`${mention}`));
				if (!data) return;
				let exp = parseInt(data["exp"]);
				if (point == "del") {
                if (isNaN(score)) {
				api.sendMessage({body: `Bạn đã xóa điểm tương tác của ${event.mentions[mention].replace("@", "")}`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID)
                exp -= exp;
				await Currencies.setData(mention, options = { exp });
               	}  
                else {     
                api.sendMessage({body: `Bạn đã xóa điểm tương tác của ${event.mentions[mention].replace("@", "")} đi `+ `${score}` + " điểm",mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID)
                exp -= parseInt(score);
				await Currencies.setData(mention, options = { exp });
                }
				}
                if (point == "add") {
                api.sendMessage({body: `Bạn đã thêm điểm tương tác của ${event.mentions[mention].replace("@", "")} lên ${score} điểm`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID);
                exp += parseInt(score);
                await Currencies.setData(mention, options = { exp });
                }
			}
    return;
}