# autocomplete
autocomplete app let user type input, and display suggestions (links) under the input
tech used: create-react-app, express-generator, es6, bootstrap, lodash

![initial screen](https://github.com/imjeee/autocomplete/blob/master/screenshots/Screen%20Shot%202018-01-30%20at%208.49.15%20PM.png)
![screen with autocomplete suggestions](https://github.com/imjeee/autocomplete/blob/master/screenshots/Screen%20Shot%202018-01-30%20at%208.49.21%20PM.png)

# Getting Started
this section will help you set it up

## installing and usage

```
1. git clone git@github.com:imjeee/autocomplete.git # clone app
```
```
2. PORT=3001 yarn start # to start server app
```
```
3. cd client && yarn start # to start react app
```
```
4. open localhost:3000 # go to UI
```

# Architecture
this project contains 2 small apps, UI app built with react.js, backend app build with express.js, backend reads a raw json file

## UI
UI handles the search page, also serves as a proxy for backend service via redirecting to http://localhost:3001

## service
service layer reads a products.json file on start up, parse the file, remove any duplicates, and saves in memory. below is its only api

```
/api/autocomplete/:userInput
```

this api gets the userInput string, compare to the product names, if there is a match, put in a json response and return to UI.

sample response object from service:

``` javascript
{
   "INVESTMENT":[
      {
         "name":"Etowah Steelworkers FCU - Investments (US)",
         "url":"http://www.escu-al.com",
         "type":"INVESTMENT"
      },
      {
         "name":"Eaton Vance Mutual Funds (US)",
         "url":"http://www.eatonvance.com/default.asp",
         "type":"INVESTMENT"
      }
   ],
   "BANK":[
      {
         "name":"E*TRADE (US) - Bank",
         "url":"https://us.etrade.com",
         "type":"BANK"
      },
      {
         "name":"E-LOAN (US) - Bank",
         "url":"http://www.eloan.com",
         "type":"BANK"
      }
   ]
}
```
