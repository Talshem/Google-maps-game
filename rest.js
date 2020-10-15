var express = require('express');
var app = express();
const path = require('path')

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/main.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/main.js'));
});

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
