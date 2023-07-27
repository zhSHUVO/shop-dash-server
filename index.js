const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
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

        const ordersCollection = client.db("shop-dash").collection("orders");

        // loading all products
        app.get("/api/products", async (req, res) => {
            const query = {};
            const cursor = await productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // load one products
        app.get("/api/products/:id", async (req, res) => {
            const id = req.params.id;
            // const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne({
                _id: new ObjectId(id),
            });
            res.send(product);
        });

        // adding new product
        app.post("/api/products", async (req, res) => {
            const product = req.body;
            const newProduct = await productCollection.insertOne(product);
            res.send(newProduct);
        });

        // load all users
        app.get("/api/auth/user", async (req, res) => {
            const users = await usersCollection.find().toArray();
            res.send(users);
        });

        // adding new user
        app.post("/api/auth/user", async (req, res) => {
            const { phone, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await usersCollection.insertOne({
                phone,
                password: hashedPassword,
            });
            res.send(newUser);
        });

        // adding new order
        app.post("/api/orders", async (req, res) => {
            const order = req.body;
            const newOrder = await ordersCollection.insertOne(order);
            res.send(newOrder);
        });

        // load all orders
        app.get("/api/orders", async (req, res) => {
            const orders = await ordersCollection.find().toArray();
            res.send(orders);
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
