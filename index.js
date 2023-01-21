const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
var price='0';
app.get("/",function(req,res){
    const { spawn } = require('child_process');
    var amazonPrice=0,flipkartPrice=0;
    var x=true
    if(req.query.hasOwnProperty('amazon')){
        x=false
        var urla=req.query.amazon
        console.log(urla)
        const amazon=spawn('python', ['public/amazon.py'])
        amazon.stdin.write(JSON.stringify(urla));
        amazon.stdin.end();
        amazon.stdout.on('data', function(data) {
            amazonPrice=data.toString();
            amazonPrice=amazonPrice.replace(',','');
            amazonPrice=parseFloat(amazonPrice);
            if(amazonPrice>flipkartPrice)
                price=flipkartPrice;
            else
                price=amazonPrice;
            res.send(JSON.stringify(price));
        });
    }
    if(req.query.hasOwnProperty('flipkart')){
        x=false
        var urlf=req.query.flipkart
        console.log(urlf)
        const flipkart=spawn('python', ['public/flipkart.py']);
        flipkart.stdin.write(JSON.stringify(urlf));
        flipkart.stdin.end();
        flipkart.stdout.on('data', function(data) {
            flipkartPrice=data.toString();
            flipkartPrice=flipkartPrice.replace(',','');
            flipkartPrice=parseFloat(flipkartPrice);
        });
    }
    if(x)
        res.send('0')
})
app.post("/",function(req,res){
    res.redirect("?amazon="+req.body.amazon+"&&flipkart="+req.body.flipkart)
})
app.get("/checkprices",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  