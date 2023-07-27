const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("shop-dash").collection("products");

        const usersCollection = client.db("shop-dash").collection("users");

        // loading all products
        app.get("/product", async (req, res) => {
            const query = {};
            const cursor = await productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // load one products
        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const electronic = await productCollection.findOne(query);
            res.send(electronic);
        });

        // adding new product
        app.post("/product", async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        // delete product
        app.delete("(/product/:id)", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });

        // load all users
        app.get("/users", async (req, res) => {
            const users = await usersCollection.find().toArray();
            res.send(users);
        });

        // adding new user
        app.post("/users", async (req, res) => {
            const users = req.body;
            const result = await usersCollection.insertOne(users);
            res.send(result);
        });

        // delete user
        app.delete("(/user/:id)", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });
    } finally {
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("StoreDash backend server is running");
});

app.listen(port, () => {
    console.log(`StoreDash app is listening on port ${port}`);
});
