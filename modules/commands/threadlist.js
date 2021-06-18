module.exports.config = {
	name: "threads",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Kirra",
	description: "",
	commandCategory: "Admin",
	usages: "threads",
	cooldowns: 5,
};

module.exports.run = async ({ api, event, Threads }) => {
	let data =  (await Threads.getAll(['threadID', 'name'])).filter(item => !!item.name);
		  let num = 0;
      var i = 0;
            let thread = '';
				        for (i = 0 ; i < data.length; i++ ){
                num += 1;
                thread += num + '. ' + data[i].name + '-' + data[i].threadID + '\n'
                }
      				  api.sendMessage(thread, event.threadID);

};