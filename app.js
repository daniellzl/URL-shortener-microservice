// require modules
var express = require('express');
var app = express();
var validUrl = require('valid-url');
var mongo = require('mongodb').MongoClient;
var database = process.env.URLSHORTENER_DB;

// Use the Pug templating language and set the view directory to /views
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// on home page request
app.get('/', function (request, response) {
  response.render('index');
});

// on all other get requests
// (*) allows for forward slashes in request.params
app.get('/:query(*)', function (request, response) {
  // extract string
  var string = request.params.query;
  // if user string is not a number
  if (isNaN(string)) {
    // if user string is a valid url
    if (validUrl.isUri(string)) {
      // define recursive function to create and check key
      // do-while loop not used to check key because of synchronization issues
      function keySearch (key, url) {
        // connect to database and check if key is already in database
        mongo.connect(database, function (err, db) {
          if (err) throw err;
          var collection = db.collection('database');
          collection.find({
            key: Number(key)
          }).toArray(function (err, docs) {
            if (err) throw err;
            // if key is not in the database
            if (docs.length === 0) {
              // create new key-url entry and insert into database
              var entry = {
                key: key,
                url: url
              };
              collection.insert(entry, function (err, data) {
                if (err) throw err;
              });
              // populate result object with the original url and the shortened url
              var result = {};
              result.original_url = url;
              result.short_url = 'https://url-shortener-dlzl.herokuapp.com/' + key;
              // display the resulting object
              response.send(result);
              // close database and return
              db.close();
              return key;
              // if key is in the database
            } else {
              // create new key and check again
              return keySearch(Math.round(Math.random() * 10000), url);
            }
          });
        });
      }
      // create a random 3 to 4 digit key and check if it is valid
      keySearch(Math.round(Math.random() * 10000), string);
      // if user string not a valid url
    } else {
      // populate result object with error and display
      var result = {};
      result.error = 'Wrong url format, make sure you have a valid protocol and real site.';
      response.send(result);
    }
    // if user string is a number
  } else {
    // connect to the database
    mongo.connect(database, function (err, db) {
      if (err) throw err;
      var collection = db.collection('database');
      // find the user entered string
      collection.find({
        key: Number(string)
      }).toArray(function (err, docs) {
        if (err) throw err;
        // if number string is in the database
        if (docs.length !== 0) {
          // redirect to corresponding url
          response.redirect(docs[0].url);
          // if number string is not in the database
        } else {
          // populate result object with error and display
          result.error = 'This url is not in the database.';
          response.send(result);
        }
        // close database
        db.close();
      });
    });
  }
});

// have app listen for connections
app.listen(process.env.PORT || 8080, function (request, response) {
  console.log('Listening for connections...');
});
