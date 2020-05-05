//Starten des Webservers 
//Einbdung der Routen
//SQL req und SQL res

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const pool = require('./db').pool;

app.get("/api/entry", async function (req, res) {
    try {
        const result = await pool.query(`
        SELECT * FROM entry
        WHERE DATEDIFF(NOW(),created)<=14
        ORDER BY created DESC
        LIMIT 20`);
        res.json(result);
        console.log(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

app.post("/api/entry", async function(req, res) {
    try{
        const entry = req.body;
        await pool.query(
            "INSERT INTO entry (name, text,title,location,price,negotiable,email) VALUES (?, ?, ?,?, ?, ?, ?)",
            [entry.name, entry.text, entry.title, entry.location, entry.price, entry.negotiable, entry.email]
        );
        res.status(201).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

app.use(express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist'));

app.listen(3000, function () {
    console.log("listening on http://127.0.0.1:3000");
});
