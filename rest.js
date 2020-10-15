var express = require('express');
var app = express();
const path = require('path')

app.use(express.json());

app.use(express.static('public'))

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
