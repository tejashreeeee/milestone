// // routes/orders.js
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');

// // Add your order-related routes here

// module.exports = router;

// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendOTP } = require('../utils/email');
const randomstring = require('randomstring'); // Updated import statement

router.post('/', async (req, res) => {
  try {
    const { userId, foodId, addressId, paymentMode } = req.body;

    // Payment gateway integration code goes here

    // Generate invoice ID and OTP
    const invoiceId = randomstring.generate();
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });

    // Save order details
    const order = new Order({
      userId,
      foodId,
      addressId,
      paymentMode,
      invoiceId,
      status: 'placed',
    });

    const savedOrder = await order.save();

    // Send OTP to user's email
    const user = await User.findById(userId); // Assuming you have a User model
    const userEmail = user.email; // Assuming you have an email field in the User model
    sendOTP(userEmail, otp);

    res.json({ order: savedOrder, otp });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
});

module.exports = router;
