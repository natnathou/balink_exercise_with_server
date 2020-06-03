const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user/new', (req, res) => {
    res.status(200).end();
});
app.get('/country', (req, res) => {
    res.json({en:["State","France", "Usa", "Israel"], fr:["Pays","France", "Amerique", "Israel"]});

});


app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));