require('dotenv').config();
//modules
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const path = require('path');
const connectDb = require('./db/connectDB');
const session = require('express-session');
const nocache = require('nocache');
const hbs = require('hbs');

hbs.registerHelper('inc', function (value) {
  return parseInt(value) + 1;
});

app.use(nocache());  //for avoid cache creation
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbacksecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public')); //static serve file

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`For User login go to /user For Admin login go to /admin`)
});

//user Routes
app.use('/user', userRoutes);
//admin Routes
app.use('/admin', adminRoutes);

//connect Database and then listen to server
connectDb().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
