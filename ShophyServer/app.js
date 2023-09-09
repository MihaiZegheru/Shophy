const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine 
app.set('view engine', 'ejs');

// Database connection
const dbURI = '';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Routes
app.get('*', checkUser);
app.use(authRoutes);
app.use(homeRoutes);
app.use(shopRoutes);
app.use(productRoutes);