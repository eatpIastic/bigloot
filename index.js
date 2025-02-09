/// <reference types="../CTAutocomplete" />

import PogObject from "../PogData";

const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");

const data = new PogObject("bigloot", {}, "loot.json");
data.save();
  
let getLoot = false;

register("chat", (event) => {    
    let chatMsg = ChatLib.getChatMessage(event).removeFormatting().trim();
    if (!getLoot) {
        if (chatMsg.match(/(WOOD|GOLD|EMERALD|OBSIDIAN|BEDROCK) CHEST REWARDS/)) {
            getLoot = true;
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
