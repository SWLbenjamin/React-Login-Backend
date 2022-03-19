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
    key: '3h21jk3h12jk5gh5412hkj12h4j3k4h23jk4h1',
    secret: '7h6j2kl54hjl1g7hghjk23ghk2j5gh57k62ghjg4h',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'intel.html'));
});

app.listen(3000);