const express = require('express');
const cors = require('cors');
const router = express.Router();
const { test, registerUser, loginUser, getDetails, EditDetails, Logout, fetchItems, getName, addToCart, getCart, deleteItem, addToOrders, getPendingOrders, checkOTP, getOrdersHistory, addReview, clearCart, chatbotResponse } = require('../controllers/authController');

router.use(
    cors({
    credentials: true,
    origin: 'http://localhost:5173'
    })
);

router.get('/', test);

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/profile', getDetails);

router.post('/edit', EditDetails);

router.get('/logout', Logout);

router.get('/search', fetchItems);

router.post('/name', getName);

router.post('/cart', addToCart);

router.get('/getCart', getCart);

router.post('/deleteItem', deleteItem);

router.post('/orders', addToOrders);

router.get('/pending', getPendingOrders);

router.post('/transaction', checkOTP);

router.get('/ordersHistory', getOrdersHistory);

router.post('/addReview', addReview);

router.post('/clearCart', clearCart);

router.post('/chatbot', chatbotResponse);

module.exports = router;