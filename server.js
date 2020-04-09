const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config/keys.js');
const path = require('path');

// connecting routes
const goods = require('./routes/api/goods');
const admin = require('./routes/login/admin');
const slides = require('./routes/api/slides');

const app = express();

// Passport config
require('./config/passport')(passport);


// static file from public folder
app.use(express.static('public'));


// parsing form data
app.use(bodyParser.urlencoded({ extended: false }));


// parsing json
app.use(express.json());


// db URI
const db = config.MongoURI;
// connect ot MongoDB
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(res => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


// Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// use routes
app.use('/api/goods', goods);
app.use('/secret/adminlogin', admin);
app.use('/api/slides', slides);



// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set a static folder
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// config items
const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});