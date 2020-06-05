const express = require('express');

const app = express();
const port = process.env.PORT || 5000;


app.post('/user/new', (req, res) => {
    res.status(200).end();
});
app.get('/country', (req, res) => {
    res.json({en:["State","France", "Usa", "Israel","Italy","Spain","Portugal"], fr:["Pays","France", "Amérique", "Israel","Italie","Espagne","Portugal"]});
});



app.listen(port, () => console.log(`Listening on port ${port}`));