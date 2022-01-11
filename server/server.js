const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());

MongoClient.connect("mongodb://localhost:27017", {
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("bird_db");
    const birdCollection = db.collection("birds");
    const birdsRouter = createRouter(birdCollection);
    app.use("/api/birds", birdsRouter);
  })
  .catch(console.error);

app.listen(5000, function () {
  console.log("Listen on port ${ this.address().port}");
});

