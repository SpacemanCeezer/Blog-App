// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Session configuration
const sessionStore = new SequelizeStore({ db: db.sequelize });
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 3600000 } // 1 hour
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./controllers/authController')(app, passport);
require('./controllers/blogController')(app);

// Sync database and start the server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
