var express = require('express');
var router = express.Router();
var fs = require("fs");
var products = getProducts('../products.json');

router.get('/:userInput', function(req, res, next) {
  // console.log(req.params.userInput)
  var input = req.params.userInput;
  // console.log(input);
  // console.log(products.products);
  var suggestedProducts = products.filter(function(prod) {
    var prodBeginning = prod.name.substring(0, input.length);
    return input.toLowerCase() === prodBeginning.toLowerCase();
  })

  console.log(suggestedProducts)

  res.json(suggestedProducts)
});

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getProducts(file){
    var filepath = __dirname + '/' + file;
    var products = readJsonFileSync(filepath);

    var keys = {};
    var productsWithoutDups = [];

    products.products.forEach(function(prod) {
      var key = prod.name + prod.url + prod.type;
      if (!keys[key]) {
        productsWithoutDups.push(prod);
        keys[key] = true;
      }
    });

    return productsWithoutDups;
}

module.exports = router;
