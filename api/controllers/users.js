"use strict";

const { dbRequest, initDb } = require("../config/pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { initNodemailer, emailHeader } = require("../startup/nodemailer");
const generator = require("generate-password");

const table = config.get("table");

function userList(req, res) {
  (async () => {
    const result = await dbRequest(`SELECT * FROM ${table}`, res);
    if (result) {
      let users = [{}];
      if (result.rowCount === 0) {
        result.fields.forEach(i => {
          const key = Object.values(i.name).join("");
          if (key !== "created" && key !== "pw") users[0][key] = "";
        });
        res.send(users);
      } else {
        if (req.headers["x-api-key"] !== config.get("APIKey")) {
          Object.keys(result.rows[0]).map(k => (users[0][k] = ""));
          delete users[0].created;
        } else users = result.rows;
        for (let row of users) {
          delete row.pw;
        }
        res.send(users);
      }
    }
  })();
}

function resetDb(req, res) {
  (async () => {
    if (req.headers["x-api-key"] !== config.get("APIKey")) {
      res.status(403).send("not authorized");
    } else {
      initDb(table);
    }
    res.send("DB has been reset");
  })();
}

function userRegister(req, res) {
  (async () => {
    let password = "string";
    const name = req.body.name;
    const email = req.body.email;
    const skipEmail = req.headers["x-api-key"] === config.get("APIKey");
    const date = new Date().toString();
    console.log("date: ", date);

    if (!skipEmail)
      password = generator.generate({
        length: 6,
        numbers: true
      });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // const hash = password;
    const result = await dbRequest(
      `INSERT INTO ${table} (name, email, pw, created) VALUES ('${name}', '${email}', '${hash}', '${date}')`,
      res
    );
    if (result) {
      if (!skipEmail) {
        try {
          const transporter = initNodemailer();
          const info = await transporter.sendMail({
            from: emailHeader.sender,
            to: email,
            subject: emailHeader.subject,
            text: emailHeader.text + password
            // html: emailHeader.html
          });
          console.log("Message sent: ", info.messageId);
        } catch (err) {
          console.log("Error when sending email", err);
        }
      }
      res.send("inserted");
    }
  })();
}

function userDelete(req, res) {
  (async () => {
    if (req.headers["x-api-key"] === config.get("APIKey")) {
      const email = req.swagger.params.email.value;
      const result = await dbRequest(
        `DELETE FROM ${table} WHERE email='${email}'`,
        res
      );
      if (result)
        if (result.rowCount == 0) res.status(401).send("unknown user");
        else res.send("deleted");
    } else res.status(403).send("not autorized");
  })();
}

function login(req, res) {
  (async () => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await dbRequest(
      `SELECT * FROM ${table} WHERE email='${email}'`,
      res
    );
    if (user.rows[0] && (await bcrypt.compare(password, user.rows[0].pw))) {
      // if (user.rows[0] && password === user.rows[0].pw) {
      delete user.rows[0].pw;
      const privateKey = config.get("jwtPrivateKey");
      const token = await jwt.sign(user.rows[0], privateKey, {
        expiresIn: "1h"
      });
      res.send(token);
    } else res.status(403).send("user or password invalid");
  })();
}

function changePassword(req, res) {
  (async () => {
    let token = req.headers["x-token"];
    let decoded;
    try {
      decoded = await jwt.verify(token, config.get("jwtPrivateKey"));
    } catch (err) {
      return res.status(403).send("token not valid");
    }
    const email = decoded.email;
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // const hash = password;
    const result = await dbRequest(
      `UPDATE ${table} SET pw='${hash}' WHERE email='${email}'`,
      res
    );
    if (result) {
      const user = await dbRequest(
        `SELECT * FROM ${table} WHERE email='${email}'`,
        res
      );
      if (user) {
        delete user.rows[0].pw;
        const privateKey = config.get("jwtPrivateKey");
        token = await jwt.sign(user.rows[0], privateKey, {
          expiresIn: "1h"
        });

        res.send(token);
      }
    }
  })();
}

function auth(req, res) {
  (async () => {
    const token = req.headers["x-token"];
    try {
      const decoded = await jwt.verify(token, config.get("jwtPrivateKey"));
      const user = await dbRequest(
        `SELECT * FROM ${table} WHERE email='${decoded.email}'`,
        res
      );
      delete user.rows[0].pw;
      res.send(user.rows[0]);
    } catch (err) {
      res.status(403).send("token not valid");
    }
  })();
}

module.exports = {
  userList,
  userRegister,
  userDelete,
  login,
  auth,
  changePassword,
  resetDb
};
