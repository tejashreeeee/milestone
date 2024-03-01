// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'superuser', 'user'], default: 'user' },
// });

// module.exports = mongoose.model('User', userSchema);

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  // Add other fields as needed
  // For example:
  displayName: String,
  email: String,
  // ... other fields
});

module.exports = mongoose.model('User', userSchema);
