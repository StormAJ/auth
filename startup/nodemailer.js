const nodemailer = require("nodemailer");
const config = require("config");

const emailHeader = {
  sender: '"Arwed Storm" <arwed.storm@web.de>',
  subject: "Authorization PIN",
  text: "Authorization PIN: ",
  html: "<b> PIN: string <b>"
};

function initNodemailer() {
  return nodemailer.createTransport({
    host: "smtp.web.de",
    port: 587,
    secure: false,
    auth: {
      user: "arwed.storm",
      pass: config.get("WebPW")
    }
  });
}

module.exports = { initNodemailer, emailHeader };
