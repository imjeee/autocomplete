var express = require('express');
var router = express.Router();
var fs = require("fs");
var products = getProducts('../products.json');

router.get('/:userInput', function(req, res, next) {
  // console.log(req.params.userInput)
  var input = req.params.userInput;
  // console.log(input);
  // console.log(products);
  var suggestedProducts = getSuggestedProducts(input, products);
  var productsByCategories = getProductsByCategories(suggestedProducts);

  // console.log(suggestedProducts)
  // console.log(productsByCategories)

  res.json(productsByCategories)
});

function getSuggestedProducts(input, products) {
  return products.filter(function(prod) {
    var prodBeginning = prod.name.substring(0, input.length);
    return input.toLowerCase() === prodBeginning.toLowerCase();
  });
}

function getProductsByCategories(suggestedProducts) {
  var productsByCategories = {};
  suggestedProducts.forEach(function(prod) {
    var category = prod.type;

    if (!productsByCategories[category]) {
      productsByCategories[category] = [];
    }

    if (productsByCategories[category].length < 2) {
      productsByCategories[category].push(prod)
    }
  })
  return productsByCategories;
}

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getProducts(file){
    var filepath = __dirname + '/' + file;
    var rawProducts = readJsonFileSync(filepath);
    var productsWithoutDups = removeDups(rawProducts.products);
    return productsWithoutDups;
}

function removeDups(products) {
  var keys = {};
  var productsWithoutDups = [];

  products.forEach(function(prod) {
    var key = prod.name + prod.url + prod.type;
    if (!keys[key]) {
      productsWithoutDups.push(prod);
      keys[key] = true;
    }
  });

  return productsWithoutDups;
}

module.exports = router;
