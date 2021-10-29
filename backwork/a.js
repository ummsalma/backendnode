const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const ObjectId = require('mongodb').ObjectId;





const port = 5000
const cors = require("cors")
app.use(cors());
app.use(express.json())
const uri = "mongodb+srv://salmansdb:6lnHWImS2Ufnt5Y2@cluster0.t6iyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("test");
        const haiku = database.collection("devices");


        app.get('/users', async (req, res) => {
            const cursor = haiku.find({});
            const user = await cursor.toArray()
            res.send(user)
        })





        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await haiku.insertOne(newUser);
            console.log('added user ', result);

            console.log("hitting the post", req.body);
            res.json(result)
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await haiku.deleteOne(query);
            console.log('delet hoise to', result);

            // console.log('added user ', result);

            // console.log("hitting the post", req.body);
            res.json(result)
        })



        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await haiku.findOne(query)
            console.log("load koro", id);
            res.send(user)
        })
        // POST method route
        // app.get('/', function (req, res) {
        //     res.send('POST request to the homepage')
        // })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world city')
})
app.listen(port, () => {
    console.log('running surver on port', port);
})




// const express = require('express')
// const app = express()
// app.get('/', (req, res => {
//     res.send('Running time')
// }))
// user : salmansdb
// pass ;6lnHWImS2Ufnt5Y2
