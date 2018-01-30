var express = require('express');
var router = express.Router();

router.get('/:userInput', function(req, res, next) {
  console.log(req.params.userInput)
  res.json({
   "products": [
       {
           "name": "American Express Cards (US)",
           "url": "https://www.americanexpress.com",
           "type": "CREDIT_CARD"
       },
       {
           "name": "ADP Retirement Services - 401k (US)",
           "url": "http://www.adp.com/solutions/employer-services/retirement-services.aspx",
           "type": "INVESTMENT"
       },
       {
           "name": "American Express Bank (Personal Savings) (US) - Bank",
           "url": "https://www.americanexpress.com/?inav=NavLogo",
           "type": "BANK"
       }
   ]
 })
});

module.exports = router;
