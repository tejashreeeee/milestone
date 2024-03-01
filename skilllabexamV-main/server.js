// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Enable CORS
// app.use(cors());

// // Parse incoming requests with JSON payloads
// app.use(bodyParser.json());

// // Connect to MongoDB (replace 'your-mongodb-url' with your actual MongoDB connection string)
// mongoose.connect('your-mongodb-url', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Routes will be added here

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Enable CORS
// app.use(cors());

// // Parse incoming requests with JSON payloads
// app.use(bodyParser.json());

// // Connect to MongoDB (replace 'your-mongodb-url' with your actual MongoDB connection string)
// // mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://127.0.0.1:27017/sip', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Import routes
// const usersRouter = require('./routes/users');
// const foodsRouter = require('./routes/foods');
// const ordersRouter = require('./routes/orders');

// // Use routes
// app.use('/users', usersRouter);
// app.use('/foods', foodsRouter);
// app.use('/orders', ordersRouter);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');

// const app = express();
// const PORT = 5000;

// // Enable CORS
// app.use(cors());

// // Parse incoming requests with JSON payloads
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/sip', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Passport Configuration
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Google OAuth Configuration
// passport.use(new GoogleStrategy({
//   clientID: 'your-google-client-id',
//   clientSecret: 'your-google-client-secret',
//   callbackURL: 'http://localhost:5000/auth/google/callback',
// }, (accessToken, refreshToken, profile, done) => {
//   // Save user information to the database or check if the user exists
//   // This depends on your application logic
//   // For simplicity, we'll assume a User model with a findOrCreate method
//   User.findOrCreate({ googleId: profile.id }, (err, user) => {
//     return done(err, user);
//   });
// }));

// // Serialize and Deserialize User
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// // Google OAuth Routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
// );

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect to the home page or any other route
//     res.redirect('/');
//   }
// );

// // Import routes
// const usersRouter = require('./routes/users');
// const foodsRouter = require('./routes/foods');
// const ordersRouter = require('./routes/orders');

// // Use routes
// app.use('/users', usersRouter);
// app.use('/foods', foodsRouter);
// app.use('/orders', ordersRouter);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./models/User'); // Adjust the path if needed


const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/sip', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Passport Configuration
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Configuration
passport.use('google',new GoogleStrategy({
  clientID: '399076106724-9goj7counuq4e1u63ijaq6s9djadndf5.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5000/auth/google/callback',
},async (accessToken, refreshToken, profile, done) => {
  // Save user information to the database or check if the user exists
  // This depends on your application logic
  // For simplicity, we'll assume a User model with a findOrCreate method
//   User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(null,profile);
//   });
}));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id);
});

// Google OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or any other route
    res.redirect('/');
  }
);

// Import routes
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');
const ordersRouter = require('./routes/orders');
const secureRoute = require('./routes/secureRoute');

// Use routes
app.use('/users', usersRouter);
app.use('/foods', foodsRouter);
app.use('/orders', ordersRouter);

// Use the protected route
app.use('/secure', secureRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
