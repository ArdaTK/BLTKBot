var mineflayer = require("mineflayer");
var db = require("quick.db");

var ayar = {
  host: "mc.bltkcraft.tk", //Sunucu IPnizi "" arasına giriniz.
  port: 64998, //Sunucu portunuzu giriniz. Genellikle 25565 olarak ayarlıdır.
  username: "BLTK", //Sunucuya giriş yapacak bot isminizi "" arasına girin.
  version: false //Burası böyle kalsın değiştirmeyin.
};

var kayit = {
  authme: "var", //Eğer sunucunuzda AuthMe eklentisi yoksa bu var yazısını yok olarak değiştirin.
  sifre: "159951" //Buraya AuthMe varsa botun giriş yapması için şifreyi girin.
};

var automessage = true; //5 Dakika'da bir sunucuda botun mesaj atmasını istemiyorsan true yazısını false olarak değiştir.

var bot = mineflayer.createBot(ayar);

bot.on("chat", function(username, message) {
  if (username === bot.username) return;
  function intervalFunc() {
    bot.setControlState("sprint", true);
  }
  setInterval(intervalFunc, 7000);

  if (kayit.authme == "var") {
    let giris = db.fetch(`giris_${ayar.host}_${ayar.username}`);
    if (!giris) {
      bot.chat(`/register ${kayit.sifre} ${kayit.sifre}`); //Kayıt olmasını sağladık.
      console.log("Bot kayıt oldu!");
      db.set(`giris_${ayar.host}_${ayar.username}`, "tm");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("/setidletimeout 2880"); // değiştirmek çok basit '' arasındaki yazıyı değiştirin yeter
        }, 3000);
      }
    }
    if (giris) {
      bot.chat(`/login ${kayit.sifre}`); //Giriş yapmasını sağladık.
      console.log("Bot giriş yaptı!");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("/setidletimeout 2880"); // değiştirmek çok basit '' arasındaki yazıyı değiştirin yeter
        }, 3000);
      }
    }
  }
});

bindEvents(bot);
function bindEvents(bot) {
  bot.on("error", function(err) {
    console.log("Bir hata oluştu!");
  });

  bot.on("end", function() {
    console.log("Bot sunucudan atıldı!");
    setTimeout(relog, 5000);
  });

  function relog() {
    console.log("Sunucuya Tekrardan Baglaniliyor...");
    bot = mineflayer.createBot(ayar);
    bot.on("chat", function(username, message) {
      if (username === bot.username) return;

      console.log("Bot tekrardan oyuna giriş yaptı!");
      bot.chat(`/login ${kayit.sifre}`);

      bot.setControlState("sprint", true);
    });

    bindEvents(bot);
  }
}

//Yeni Kod:
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 150000);
