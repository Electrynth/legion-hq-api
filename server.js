const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bodyParser = require('body-parser');
const config = require('./config.js');

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(3001, () => {
  console.log('Server is listening on port 3001')
});
