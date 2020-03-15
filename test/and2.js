const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app
   .use(express.static('prod/www'))
   .use(cors())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json());

// Routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'prod/www', 'index.html'));
});

///////////////////////////////////////////////////
///////////////       RUN      ////////////////////
///////////////////////////////////////////////////

const port = process.env.PORT || 5555;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("AnD2-test is running in port:", port) ;
});