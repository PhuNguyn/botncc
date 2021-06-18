module.exports.config = {
  name: "minecraft",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kirra",
  description: "",
  commandCategory: "other",
  usages: "minecraft",
  cooldowns: 10,
  dependencies: ["axios", "js-base64", "fs-extra"],
    envConfig: {
    "HYPIXEL_API": "2aaba24d-7fb5-4003-8bfb-d8458a9499a1"
    }
};

module.exports.run = async function({ event, api, args, __GLOBAL}) {
  const Base64 = require("js-base64");
  const axios = require("axios");
  const fs = require("fs-extra");
  if (!args[0]) return api.sendMessage("Username này không tồn tại",event.threadID,event.messageID);
  if (args[0] == "hypixel"){
  if (!args[1]) return api.sendMessage("Username này không tồn tại",event.threadID,event.messageID);
  let res = (await  axios.get(encodeURI(`https://api.mojang.com/users/profiles/minecraft/${args[1]}`))).data;
  try {
    let res_ = (await axios.get(encodeURI(`https://api.hypixel.net/player?key=${__GLOBAL.minecraft.HYPIXEL_API}&uuid=${res.id}`))).data;
    var data = res_.player.stats;
  
    var SkyWars = data.SkyWars;
    var Bedwars = data.Bedwars;
    var Arcade = data.Arcade;
    var TNTGames = data.TNTGames;
    var HungerGames = data.HungerGames;
    var UHC = data.UHC;
    var Walls3 = data.Walls3;
    var SkyClash = data.SkyClash;
    var TrueCombat = data.TrueCombat;
    var SkyClash = data.SkyClash;
    var MCGO = data.MCGO;
    var Walls = data.Walls;
    var VampireZ = data.VampireZ;
    var Arena = data.Arena;
    var Quake = data.Quake;
    var Paintball = data.Paintball;
    var GingerBread = data.GingerBread;
    var Battleground = data.Battleground;
    var SpeedUHC = data.SpeedUHC;
    var MurderMystery = data.MurderMystery;
    var Duels = data.Duels;
    var BuildBattle = data.BuildBattle;
    var Pit = data.Pit;
    var SkyBlock = data.SkyBlock;
    var achievements = res_.player.achievements;

    let avt = (await axios.get(`https://crafatar.com/avatars/${res.id}`, {responseType: "arraybuffer"})).data;
    fs.writeFileSync(__dirname + "/cache/avt-mc.png",Buffer.from(avt, "utf-8"));
    return api.sendMessage({body:`Name: ${res.name} \nUUID: ${res.id}\n`+
          `Hypixel infomation:\n` +
          `*****SkyWars*****\n` +
          `Coins: ${SkyWars.coins} coins\n` +
          `Cases: ${achievements.skywars_cages} cases\n` +
          `Games played SkyWars: ${SkyWars.games_played_skywars} times\n\n` +
          `Losses: ${SkyWars.losses} times\n` +
          `Wins solo: ${achievements.skywars_wins_solo} times\n` +
          `Kills solo: ${achievements.skywars_kills_solo} kills\n` +
          `Kits solo: ${achievements.skywars_kits_solo} kits\n\n` +
          `Wins team: ${achievements.skywars_wins_team} times\n` +
          `Kills team: ${achievements.skywars_kills_team} kills\n` +
          `Kits team: ${achievements.skywars_kits_team} kits\n\n` +
          `Wins mega: ${achievements.skywars_wins_mega} times\n` +
          `Kills mega: ${achievements.skywars_kills_mega} kills\n` +
          `Kits mega: ${achievements.skywars_kits_mega} kits\n\n` +
          `\n*****Bedwars*****\n` +
          `Coins: ${Bedwars.coins} coins\n` +
          `Games played Bedwars: ${Bedwars.games_played_bedwars} times\n` +
          `Losses: ${Bedwars.losses_bedwars} times\n` +
          `Wins : ${achievements.bedwars_wins} times\n` +
          `Beds: ${achievements.bedwars_beds} times\n` +
          `Kills: ${Bedwars.kills_bedwars} times\n` +
          `\n*****MurderMystery*****\n` +
          `Coins: ${MurderMystery.coins} coins\n` +
          `Games played Bedwars: ${Bedwars.games_played_bedwars} times\n` +
          `Deaths: ${MurderMystery.deaths} times\n` +
          `Wins: ${MurderMystery.wins} times\n` +
          `Kills: ${MurderMystery.kills} times\n` +
          `\n*****Duels*****\n` +
          `Coins: ${Duels.coins} coins\n` +
          `Games played Duels: ${Duels.games_played_duels} times\n` +
          `Deaths: ${Duels.deaths} times\n` +
          `Wins: ${Duels.wins} times\n` +
          `Bridge wins: ${achievements.duels_bridge_wins} times\n` +
          `Goals: ${achievements.duels_goals} times\n` +
          `Kills: ${Duels.kills} times\n` +
          `\n*****SpeedUHC*****\n` +
          `Coins: ${SpeedUHC.coins} coins\n` +
          `Score: ${SpeedUHC.score}\n`+
          `\n*****Arcade*****\n` +
          `Coins: ${Arcade.coins} coins\n` +
          `Winner: ${achievements.arcade_arcade_winner} times\n` +
          `\n*****TNTGames*****\n` +
          `Coins: ${TNTGames.coins} coins\n` +
          `Wins: ${TNTGames.wins} times\n` +
          `\n*****HungerGames*****\n` +
          `Coins: ${HungerGames.coins} coins\n` +
          `Deaths: ${HungerGames.deaths} times\n` +
          `Wins: ${HungerGames.wins} times\n` +
          `\n*****MCGO*****\n` +
          `Coins: ${MCGO.coins} coins\n` +
          `Bombs planted: ${MCGO.bombs_planted} times\n` +
          `Wins: ${MCGO.game_wins} times\n` +
          `Kills: ${MCGO.kills} times\n` +
          `\n*****Paintball*****\n` +
          `Coins: ${Paintball.coins} coins\n` +
          `Deaths: ${Paintball.deaths} times\n` +
          `Kills: ${Paintball.kills} times\n`+
          `\n*****UHC*****\n` +
          `Coins: ${UHC.coins} coins\n` +
          `Deaths: ${UHC.deaths} times\n` +
          `Wins: ${UHC.wins} times\n` +
          `Kills: ${UHC.kills} times\n` +
          `\n*****SpeedUHC*****\n` +
          `Coins: ${SpeedUHC.coins} coins\n` +
          `Score: ${SpeedUHC.score}\n`+
          `\n*****BuildBattle*****\n` +
          `Coins: ${BuildBattle.coins} coins\n` +
          `Score: ${BuildBattle.score}\n` +
          `Teams most points: ${BuildBattle.teams_most_points} times\n` +
          `Games played: ${BuildBattle.games_played} times\n` +     
          `\n*****Pit*****\n` +
          `Coins: ${Pit.coins} coins\n` +
          `Gold: ${achievements.pit_gold} times\n` +
          `Deaths: ${Pit.deaths} times\n` +
          `Kills: ${Pit.kills} times\n` +
          `Max streak: ${Pit.max_streak}\n` + 
          `\n*****Battleground*****\n` +
          `Coins: ${Battleground.coins} coins\n` +
          `Class: ${Battleground.chosen_class}\n`+
          `\n*****Walls3*****\n` +
          `Coins: ${Walls3.coins} coins\n`+
          `\n*****Walls*****\n` +
          `Coins: ${Walls.coins} coins\n`+
          `\n*****VampireZ*****\n` +
          `Coins: ${VampireZ.coins} coins\n`+
          `\n*****Arena*****\n` +
          `Coins: ${Arena.coins} coins\n`+
          `\n*****Quake*****\n` +
          `Coins: ${Quake.coins} coins\n`+
          `\n*****SkyClash*****\n` +
          `Coins: ${SkyClash.coins} coins\n`+
           `\n*****TrueCombat*****\n` +
          `Coins: ${TrueCombat.coins} coins\n` +
          `\n*****GingerBread*****\n` +
          `Coins: ${GingerBread.coins} coins\n` +
          `\n*****SkyBlock*****\n` +
          `None` 
      ,attachment: fs.createReadStream(__dirname + `/cache/avt-mc.png`)},event.threadID,event.messageID);
   }
    catch (e) {
    return api.sendMessage("Username này không tồn tại",event.threadID,event.messageID);
    }
  }
  else { 
    try {
      let res = (await  axios.get(encodeURI(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`))).data;
      let body = (await axios.get(`https://crafatar.com/renders/body/${res.id}`,{responseType: "arraybuffer"})).data;
      fs.writeFileSync(__dirname + "/cache/body-mc.png",Buffer.from(body, "utf-8"));
      let head = (await axios.get(`https://crafatar.com/renders/head/${res.id}`,{responseType: "arraybuffer"})).data;
      fs.writeFileSync(__dirname + "/cache/head-mc.png",Buffer.from(head, "utf-8"));
      let avt = (await axios.get(`https://crafatar.com/avatars/${res.id}`, {responseType: "arraybuffer"})).data;
      fs.writeFileSync(__dirname + "/cache/avt-mc.png",Buffer.from(avt, "utf-8"));
      let skin = (await axios.get(`https://crafatar.com/skins/${res.id}?size=512&default=MHF_Steve&overlay`,{responseType: "arraybuffer"})).data;
      fs.writeFileSync(__dirname + "/cache/skin-mc.png",Buffer.from(skin, "utf-8"));
      return api.sendMessage({body: `Name: ${res.name}\nUUID: ${res.id}`,attachment: [fs.createReadStream(__dirname + `/cache/avt-mc.png`),fs.createReadStream(__dirname + `/cache/head-mc.png`),fs.createReadStream(__dirname + `/cache/body-mc.png`),fs.createReadStream(__dirname + `/cache/skin-mc.png`)]},event.threadID, event.messageID);     
    }
    catch (e) {
      return api.sendMessage("Username này không tồn tại",event.threadID,event.messageID);
    }
  }
}; //xong load module là xong
//chỉ tí crawl sang api :)))