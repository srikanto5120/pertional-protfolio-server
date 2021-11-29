const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
nodemailer = require("nodemailer");
require("dotenv").config();
const port = process.env.PORT || 5001;

// // middleware
app.use(express.json());
app.use(cors());
app.post("/users", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shreekantaray@gmail.com",
      pass: "{#$k/a/n/t/o<SK>5.1.2.0$#}",
    },
  });
  var mailOptions = {
    from: " shreekantaray@gmail.com ",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.description,
    html: `
    <div style="padding:10px, border-style:ridge">
        <p>You have a new connection</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email:${req.body.to}</li>
            <li>Subject:${req.body.subject}</li>
            <li>Description:${req.body.description}</li>
        </ul>
        
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
    } else {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
    }
  });
});

app.get("/", (req, res) => {
  res.json("hello world");
});
app.listen(port, () => {
  console.log("running on ", port);
});
