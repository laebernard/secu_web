var express = require ("express"),
  app = express()
  port = process.env.PORT || 5000,
  bodyParser = require("body-parser"),
  path = require("path"),
  xss = require("xss");


var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.get('/', urlencodedParser, function (req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/add', urlencodedParser, function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log(req.body.firstname);
})

app.listen(port);