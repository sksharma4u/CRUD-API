const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');

const app = express();
//console.log(express);
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // urlencoded method within body-parser tells body-parser to extract data from the form

var db

MongoClient.connect('mongodb+srv://quotes:Sachin123@cluster0.pfn5b.mongodb.net/test', (err, client) => {
    if (err)
        return console.log(err);
    console.log(client)
    db = client.db('test');
    app.listen(3000, () => { console.log('Its started  connected successfully! on 3000') })
}); //Connect the DataBase

//CRUD Read operation Begin:

//READ request send to the server to perform READ opearation
//app.get(path, callback); GET Request

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html'); //.send() method on the res object forwards any data passed as an argument  to the client-side.
    //console.log(res);
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('index.ejs', { quotes: result })
    })
})

//CREATE: To sent POST request to ther server 

app.post('/quotes', async(req, res) => {
    //console.log(req.body)
    await db.collection('quotes').findOneAndUpdate({ name: 'sachin' }, { $set: { name: req.body.name, quote: req.body.quote } }, { sort: { _id: -1 }, upsert: true }, (err, result) => {
        if (err) return res.send(err) //query                                      update                                                options                      callback
        res.send(result)
    })

    await db.collection('quotes').insertOne(req.body, (err, result) => {
        if (err)
            return console.log(err);
        console.log('Saved to database')
        console.log(result);
        res.redirect('/')
    })
})

//Update the quotes


//Delete the quotes

app.delete('/quotes', (req, res) => {
    db.collection('quotes').deleteOne({}, { sort: { _id: -1 }, upsert: true }, (err, result) => {
        if (err) return res.send(500, err)

        res.send("Its deleted")
    })
    console.log(req);
})