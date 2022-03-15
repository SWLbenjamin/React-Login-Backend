const express       = require('express');
const app           = express();
const path          = require('path');
const mysql         = require('mysql');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session')(session);
const Router        = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'swlbenjamin',
    password: '190398',
    database: 'login_db'
});

db.connect(function(err) {
    if (err) {
        console.log('BD error');
        throw err;
        return false;
    }
})

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnCLose: false
}, db);

app.use(session({
    key: '',
    secret: '',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));