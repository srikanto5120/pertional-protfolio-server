const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const cors = require("cors");
nodemailer = require("nodemailer");
require("dotenv").config();
const port = process.env.PORT || 5000;

// // middleware
app.use(express.json());
app.use(cors());

//mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efvjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("portfolio");
    const projectsCollection = database.collection("projects");

    // get   data
    app.get("/projects", async (req, res) => {
      const result = await projectsCollection.find({}).toArray();
      res.send(result);
    });
    // order get data
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: ObjectId(id) };
      const result = await projectsCollection.findOne(cursor);
      res.send(result);
    });

    console.log("bikes");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.json("hello world");
});
app.listen(port, () => {
  console.log("running on ", port);
});
