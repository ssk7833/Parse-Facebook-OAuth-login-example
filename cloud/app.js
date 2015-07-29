var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var parseFacebookUserSession = require('cloud/parse-facebook-user-session');

var app = express();

// ... Configure the express app ...

app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());
app.use(express.cookieParser('YOUR_SIGNING_SECRET'));
app.use(parseExpressCookieSession({ cookie: { maxAge: 3600000 } }));

// App configuration section
app.set('views', 'cloud/views');  // Folder containing view templates
app.set('view engine', 'ejs');    // Template engine
app.use(express.bodyParser());    // Read the request body into a JS object

var fbLogin = parseFacebookUserSession({
  clientId: 'YOUR_FB_CLIENT_ID',
  appSecret: 'YOUR_FB_APP_SECRET',
  redirectUri: '/login',
  // permissions you want to get, use "," to separate scope name.
  // scope: 'user_friends',
});

// Clicking submit on the login form triggers this. Do not remove it.
app.get('/login', fbLogin, function(req, res) {
});

app.get('/logout', function(req, res) {
  Parse.User.logOut();
  res.render('index', { message: 'You are now logged out!' });
});

// This page does not need to login 
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', fbLogin, function(req, res) {
  var user = Parse.User.current();
  Parse.Cloud.run('facebookProfile', { user_id: user.id }, {
    success: function(results) {
      res.render('profile', {
        id: results.id,
        name: results.name
      });
    },
    error: function(error) {
      console.log("error :" + error);
    }
  });
  
});

// Attach the Express app to your Cloud Code
app.listen();