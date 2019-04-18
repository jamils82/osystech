let express = require('express');
let cors = require('cors');
let bodyparser = require('body-parser');
const path = require('path');
let app = express();
let mongoose = require('mongoose');
const port = process.env.PORT || 3000;
let {Schema} = mongoose;
let db = mongoose.connect('mongodb://saad:saad123@ds161335.mlab.com:61335/books');
var jsonparser = bodyparser.json();
app.use(jsonparser);
app.use(bodyparser.urlencoded({extended: true}));
let userSchema = new Schema({
    username: String,
    password: String,
    gender: String,
    email: String,
    phone: String,
    institute: String,
    city: String, 
    role: String
});
let programs = new Schema({
  title: String,
  description : String, 
  option: String,
  url : String 
})
var User = mongoose.model('appUsers', userSchema);
var Programs = mongoose.model('Programs' , programs );
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
app.use( cors(corsOptions));
  app.use(express.static(__dirname + '/www'));
  app.use(function (req, res, next) {
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
  
app.route('/api/signup').post((req, res) => {
  console.log(req.body);
  const us = new User(req.body);
  console.log(req.body);
  us.save();
  res.send(201, req.params);
});
app.route('/api/submit').post((req, res) => {
  const us = new Programs(req.body);
  console.log(req.body);
  us.save();
  res.send(201, req.body);
});

app.route('/api/get').get( (req, res) => {
  User.find( {} , (err, data) => {
    if( err) {
      res.send('err');
    }
    else {
        if(!data){
          res.send('No Record Found')
        }
        else {
          //  console.log(data);
          res.send(data);
        }  
    }
  } )
});
app.route('/api/getdata/:username').get((req, res) => {
  const requestedName = req.params.username;
  console.log(requestedName);
  User.findOne(  { username: requestedName} , (err , data) => {
    if( err) {
      console.log('err');
      res.send(err);
    }
    else {
      if(!data){
          res.send('No Record Found')
        }
        else {
          myname = data.username;
          console.log(myname);
          res.send(data);
        }  
      }
  } )
});
  
app.route('/api/deleteuser/:username').delete((req, res) => {
  console.log(req.params);
  const name = req.params.username;
  User.findOneAndDelete( {username : name} , (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
      console.log('deleted');
    }
  });
});
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
  });
  app.listen(port, () => {
  	console.log(`Running on Port ${port}`);
  });
  app.all('*', function (req, res) { res.status(200).sendFile(path.join(__dirname, '/dist/index.html')); });
  
  
  