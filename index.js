const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yiklsv0.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const petsData = client.db('petsDb').collection('pets');


async function run() {
  try {
   

    app.get('/pets', async (req, res) => {
      const result = await petsData.find().toArray();
      res.send(result);
})




    app.post('/pets', async (req, res) => {
      const data = req.body;
      const result = await petsData.insertOne(data);
      console.log("data",data);
      res.send(result)
})








    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
 
    // await client.close();
  }
}







app.get("/", (req, res) => {
  res.send("pets server is running....");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

run().catch(console.dir);
