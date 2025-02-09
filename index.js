/// <reference types="../CTAutocomplete" />

import PogObject from "../PogData";

const data = new PogObject("bigloot", {
    "chests": 0
}, "loot.json");
data.save();
  
let getLoot = false;

register("chat", (event) => {    
    let chatMsg = ChatLib.getChatMessage(event).removeFormatting().trim();
    if (!getLoot) {
        if (chatMsg.match(/(WOOD|GOLD|EMERALD|OBSIDIAN|BEDROCK) CHEST REWARDS/)) {
            getLoot = true;
            data["chests"] += 1;
            data.save();
        }
        return;
    }
    if (chatMsg == "") {
        getLoot = false;
        return;
    }

    if (chatMsg.match(/.+Essence x(\d+)/)) {
        let amt = parseInt(chatMsg.match(/.+Essence x(\d+)/)[1]);
        let type = chatMsg.match(/(.+) Essence x.+/)[1];
        if (!data?.[type]) {
            data[type] = amt;
        } else {
            data[type] += amt;
        }
    } else {
        if (!data?.[chatMsg]) {
            data[chatMsg] = 1;
        } else {
            data[chatMsg] += 1;
        }
    }
    data.save();
});
