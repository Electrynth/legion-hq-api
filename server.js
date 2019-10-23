const express = require('express');
const fs = require('fs');
const compression = require('compression');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bodyParser = require('body-parser');
const https = require('https');
const config = require('./config.js');
const key = fs.readFileSync('ssl/server.key', 'utf8');
const cert = fs.readFileSync('ssl/server.crt', 'utf8');

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to database.');
}).catch(error => {
  console.log('Could not connect to database!', error);
  process.exit();
});
autoIncrement.initialize(mongoose.connection);

require('./routes/user.routes.js')(app, autoIncrement);
require('./routes/user_list.routes.js')(app, autoIncrement);

app.get('/', (req, res) => res.status(200).send('legion-hq-api'));

const server = https.createServer({ key, cert }, app);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}.`);
});
