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


app.post("/add", urlencodedParser, function (req, res) {
  var html = xss(req.body.firstname, {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });

  console.log("After " + html);

  res.redirect("/");
})



app.listen(port);