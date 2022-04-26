const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();

//malware
app.use(cors());
app.use(express.json());

//dbNetwork1
//cD02lCoVuCAaC8rQ

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6rva8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const volunterCollection = client.db("volunter").collection("activities");

    //get
    app.get("/activities", async (req, res) => {
      const query = {};
      const cursor = volunterCollection.find(query);
      const volunters = await cursor.toArray();
      res.send(volunters);
    });

    //post
    app.post("/addVolunteer", async (req, res) => {
      const newVolunteer = req.body;
      const result = await volunterCollection.insertOne(newVolunteer);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("This is gonna be volunter-network");
});

app.listen(port, () => {
  console.log("Volunter network is running", port);
});
