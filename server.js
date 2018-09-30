const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express(),
  PersonnesController = require('./controllers/PersonnesController'),
  AuthController = require('./controllers/AuthController');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/login', function (req, res) {
  AuthController.login(req, res);
});

app.get('/personnes', function (req, res) {
  PersonnesController.getList(req, res);
});

app.get('/personnes/:id', function (req, res) {
  PersonnesController.get(req, res);
});

app.post('/personnes', function (req, res) {
  PersonnesController.add(req, res);
});

app.put('/personnes/:id', function (req, res) {
  PersonnesController.update(req, res);
});

app.delete('/personnes/:id', function (req, res) {
  PersonnesController.delete(req, res);
});

app.listen(process.env.PORT, function () {
  console.log(process.env.APP_NAME + ' Start !');
  console.log('Listening on port ' + process.env.PORT);
});
