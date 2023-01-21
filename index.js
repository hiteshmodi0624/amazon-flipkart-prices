const express = require("express");
const app = express();
var Xray = require('x-ray')
var xray = Xray()
app.get("/",function(req,res){
    var aprice=0,fprice=0;
    if(req.query.hasOwnProperty('amazon')&&req.query.hasOwnProperty('flipkart')){
        xray(req.query.amazon, '.a-price-whole')(function(err,resp){
            aprice=parseInt(resp.replace('.','').replace(',',''))
            xray(req.query.flipkart, '._16Jk6d')(function(err,resp){
                fprice=parseInt(resp.substring(1).replace(',',''))
                res.send(JSON.stringify(Math.min(fprice,aprice)))
            })
        })
    }
    else if(req.query.hasOwnProperty('amazon')){
        xray(req.query.amazon, '.a-price-whole')(function(err,resp){
            aprice=parseInt(resp.replace('.','').replace(',',''))
            res.send(JSON.stringify(aprice))
        })
    }
    else if(req.query.hasOwnProperty('flipkart')){
        xray(req.query.flipkart, '._16Jk6d')(function(err,resp){
            fprice=parseInt(resp.substring(1).replace(',',''))
            res.send(JSON.stringify(fprice))
        })
    }
    else
        res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    res.redirect("?amazon="+req.body.amazon+"&&flipkart="+req.body.flipkart)
})
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  