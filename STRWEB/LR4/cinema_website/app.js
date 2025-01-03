var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerDocs = require('./config/swagger');
const connectDB = require('./config/db');
const passport = require("./config/passport")
const session = require("express-session")
const authRoutes = require('./routes/auth')
const cors = require('cors');


const User = require('./models/User');
const Film = require('./models/Film');
const Merchandise = require('./models/Merchandise');
const Contact = require('./models/Contact');





var app = express();



connectDB();

app.use(
  session({
    secret: "K8wzD2l3ZjdmfXl5dUgL0L9kZ7po3KlQ15qhbK2ANpg=",
    resave: false, // Не пересохранять сессию, если она не изменялась
    saveUninitialized: false, // Не сохранять неинициализированные сессии
    cookie: { secure: false, maxAge: 3600000 } // Время жизни cookies (1 час)
  })
);

const corsOption = {
  origin: 'http://localhost:3000', // Разрешенный домен
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}

app.use(cors(corsOption))

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/auth", authRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/films', require('./routes/filmRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/merchandise', require('./routes/merchandiseRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));





swaggerDocs(app, process.env.PORT || 8000);

app.get('/db', (req,res) =>{
  res.send('API running')
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
