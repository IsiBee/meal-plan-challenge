const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(session(sess));
app.use(routes);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});