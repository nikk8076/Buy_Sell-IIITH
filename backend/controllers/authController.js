const test = (req, res) => {
  res.json("working");
};
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/user");
const Item = require("../models/item");
const Orders = require("../models/order");
const { default: mongoose } = require("mongoose");
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, contactNumber, recaptchaToken } =
      req.body;
    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !age ||
      !contactNumber
    ) {
      return res.json({ error: "All fields are required" });
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return res.json({ error: "Please complete the reCAPTCHA verification" });
    }

    try {
      const recaptchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
          },
        }
      );

      if (!recaptchaResponse.data.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResponse.data);
        return res.json({ error: 'reCAPTCHA verification failed. Please try again.' });
      }
    } catch (recaptchaError) {
      console.error('reCAPTCHA verification error:', recaptchaError);
      return res.json({ error: 'reCAPTCHA verification failed. Please try again.' });
    }

    console.log(req.body);
    //iiith email verification
    const pattern =
      /^[a-zA-Z0-9._%+-]+@(students|faculty|research)\.iiit\.ac\.in$/;
    if (!pattern.test(email)) {
      return res.json({ error: "Please use IIIT-H email" });
    }
    const exist = await User.findOne({ email });
    if (exist)
      return res.json({ error: "User already exists with that email" });
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age: Number(age),
      contactNumber,
    });
    return res.json(req.body);
  } catch (error) {
    return res.json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;
    if (!email || !password) {
      return res.json({ error: "All fields are required" });
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return res.json({ error: "Please complete the reCAPTCHA verification" });
    }

    try {
      const recaptchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
          },
        }
      );

      if (!recaptchaResponse.data.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResponse.data);
        return res.json({ error: 'reCAPTCHA verification failed. Please try again.' });
      }
    } catch (recaptchaError) {
      console.error('reCAPTCHA verification error:', recaptchaError);
      return res.json({ error: 'reCAPTCHA verification failed. Please try again.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const result = await comparePassword(password, user.password);
    if (!result) {
      return res.json({ error: "Invalid password" });
    }
    console.log(user._id);
    jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        cart: user.cart,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {
    return res.json({ error: "Internal server error" });
  }
};

const getDetails = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      // console.log("verified");
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const EditDetails = async (req, res) => {
  try {
    const { oldEmail, email, firstName, lastName, contactNumber } = req.body;
    const user = await User.findOne({ email: oldEmail });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.contactNumber = contactNumber;
    await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {}
};

const Logout = (req, res) => {
  res.clearCookie("token").json("success");
};

const fetchItems = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sellerId = decoded.id;

    const items = await Item.find({ seller_id: { $ne: sellerId } });
    res.json(items);
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal server error" });
  }
};

const getName = async (req, res) => {
  const { seller_id } = req.body;
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);
  const user = await User.findById(seller_id);
  if (!user) {
    console.log("not found");
    res.json({ error: "Not found" });
  } else {
    // console.log(user.firstName, user.lastName, user.email, user.contactNumber);
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      seller_email: user.email,
      buyer_email: decoded.email,
    });
  }
};

const addToCart = async (req, res) => {
  // console.log(req.body);
  const { id, name, price, seller_id, buyer_email } = req.body;
  const user = await User.findOne({ email: buyer_email });
  const newItem = { name, price, seller_id, id };
  console.log(seller_id);
  if (user) {
    console.log("here");
    user.cart.push(newItem);
    await user.save();
    res.json({ message: "done" });
  } else {
    res.json({ error: "No user found" });
  }
};

const getCart = async (req, res) => {
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    const target = decoded.email;
    const user = await User.findOne({ email: target });
    if (user) {
      const cart = user.cart;
      res.json({ cart: cart });
    } else {
      res.json({ error: "user not found" });
    }
  } else {
    res.json({ error: "token error" });
  }
};

const deleteItem = async (req, res) => {
  const id = req.body.itemId;
  // console.log(id);
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (user) {
      const index = user.cart.findIndex((item) => item.id.equals(id));
      if (index === -1) {
        res.json({ error: "item not found" });
      }
      user.cart.splice(index, 1);
      await user.save();
      res.json({ message: "item removed" });
    } else {
      res.json({ error: "user not found" });
    }
  } else {
    res.json({ error: "json error" });
  }
};

const addToOrders = async (req, res) => {
  const { cart } = req.body;
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    const buyer_email = decoded.email;
    const buyer = await User.findOne({ email: buyer_email });
    const buyer_id = buyer._id;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRounds = 10;
    const hashed_otp = await bcrypt.hash(otp, saltRounds);
    for (const item of cart) {
      const seller_id = item.seller_id;
      await Orders.create({
        buyer_id: buyer_id,
        seller_id: seller_id,
        amount: item.price,
        otp: hashed_otp,
        status: "Pending",
        item_id: item.id,
      });
    }
    res.json({ otp: otp });
  } else {
    res.json({ error: "error finding user" });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller_id = decoded.id;

    const buyers = await Orders.aggregate([
      {
        $match: { seller_id: new mongoose.Types.ObjectId(seller_id), status: "Pending" },
      },
      {
        $lookup: {
          from: "users",
          localField: "buyer_id",
          foreignField: "_id",
          as: "buyerDetails"
        }
      },
      {
        $unwind: "$buyerDetails"
      },
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      {
        $unwind: "$itemDetails"
      },
      {
        $group: {
          _id: "$buyer_id",
          buyerDetails: { $first: "$buyerDetails" },
          items: {
            $push: {
              id: "$itemDetails._id",
              name: "$itemDetails.name",
              price: "$amount"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          buyerDetails: {
            id: "$buyerDetails._id",
            email: "$buyerDetails.email",
            firstName: "$buyerDetails.firstName",
            lastName: "$buyerDetails.lastName"
          },
          items: 1
        }
      }
    ]);

    res.json(buyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkOTP = async (req, res) => {
  const { buyerId, itemId, otp } = req.body;
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sellerId = decoded.id;

  try {
    const order = await Orders.findOne({ buyer_id: buyerId, seller_id: sellerId, item_id: itemId, status: "Pending" });
    if (order) {
      const isOtpValid = await bcrypt.compare(otp, order.otp);
      if (isOtpValid) {
        order.status = 'Sold';
        await order.save();
        return res.json({ success: true, message: 'Transaction successful!' });
      } else {
        return res.json({ success: false, message: 'Invalid OTP. Please try again.' });
      }
    } else {
      return res.json({ success: false, message: 'Order not found.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const getOrdersHistory = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const soldItems = await Orders.aggregate([
      { $match: { seller_id: new mongoose.Types.ObjectId(userId), status: "Sold" } },
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      { $unwind: "$itemDetails" },
      {
        $lookup: {
          from: "users",
          localField: "buyer_id",
          foreignField: "_id",
          as: "buyerDetails"
        }
      },
      { $unwind: "$buyerDetails" },
      {
        $project: {
          name: "$itemDetails.name",
          price: "$amount",
          buyerName: { $concat: ["$buyerDetails.firstName", " ", "$buyerDetails.lastName"] }
        }
      }
    ]);

    const pendingOrders = await Orders.aggregate([
      { $match: { buyer_id: new mongoose.Types.ObjectId(userId), status: "Pending" } },
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      { $unwind: "$itemDetails" },
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "_id",
          as: "sellerDetails"
        }
      },
      { $unwind: "$sellerDetails" },
      {
        $project: {
          itemName: "$itemDetails.name",
          price: "$amount",
          sellerName: { $concat: ["$sellerDetails.firstName", " ", "$sellerDetails.lastName"] }
        }
      }
    ]);

    const soldOrders = await Orders.aggregate([
      { $match: { buyer_id: new mongoose.Types.ObjectId(userId), status: "Sold" } },
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      { $unwind: "$itemDetails" },
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "_id",
          as: "sellerDetails"
        }
      },
      { $unwind: "$sellerDetails" },
      {
        $project: {
          itemName: "$itemDetails.name",
          price: "$amount",
          sellerName: { $concat: ["$sellerDetails.firstName", " ", "$sellerDetails.lastName"] }
        }
      }
    ]);

    res.json({ soldItems, pendingOrders, soldOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addReview = async (req, res) => {
  const { content } = req.body;
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const buyerId = decoded.id;

  try {
    const seller = await User.findById(buyerId); // Assuming the token contains the seller ID
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    seller.reviews.push({ content, user_id: buyerId });
    await seller.save();

    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const email = decoded.email;
      const user = await User.findOne({ email: email });
      if (user) {
        user.cart = [];
        await user.save();
        res.json({ message: "Cart cleared successfully" });
      } else {
        res.json({ error: "User not found" });
      }
    } else {
      res.json({ error: "Token error" });
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const chatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.json({ error: 'Message is required' });
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      throw new Error('Gemini API key is not configured');
    }

    // Get user context for personalized responses
    const { token } = req.cookies;
    let userContext = '';
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userContext = `User: ${decoded.firstName} ${decoded.lastName}`;
      } catch (err) {
        // If token verification fails, continue without user context
      }
    }

    // Enhanced system prompt for buy-sell platform
    const systemPrompt = `You are a helpful shopping assistant for a buy-sell platform at IIIT Hyderabad. 
    Your role is to help users with:
    - Product recommendations and searches
    - Answering questions about items, categories, and features
    - Helping with buying and selling processes
    - General platform guidance
    - Shopping advice and tips
    
    Keep responses concise, friendly, and relevant to the shopping context.
    Available categories include: Electronics, Accessories, Furniture, Appliances.
    
    ${userContext ? `Current user context: ${userContext}` : ''}
    
    User message: ${message}`;

    console.log('Calling Gemini API...');
    
    // Call Google Gemini API
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API Error:', geminiResponse.status, errorText);
      throw new Error(`Gemini API Error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini API Response:', JSON.stringify(geminiData, null, 2));
    
    if (geminiData.candidates && geminiData.candidates.length > 0) {
      const aiResponse = geminiData.candidates[0].content.parts[0].text;
      res.json({ response: aiResponse });
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback responses for common queries
    const fallbackResponses = {
      'hello': 'Hello! Welcome to our buy-sell platform. How can I help you today?',
      'help': 'I can help you with product searches, recommendations, and questions about buying or selling items on our platform.',
      'search': 'You can search for items using the search bar. We have categories like Electronics, Accessories, Furniture, and Appliances.',
      'buy': 'To buy items, add them to your cart and proceed with the checkout process. You\'ll receive an OTP for the transaction.',
      'sell': 'To sell items, you can add them to your inventory from your dashboard.',
      'default': 'I\'m sorry, I\'m having trouble processing your request right now. Please try asking about products, buying, selling, or general platform help.'
    };

    // Safely access message with fallback
    const userMessage = (message || '').toLowerCase();
    let fallbackResponse = fallbackResponses.default;

    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (userMessage.includes(key)) {
        fallbackResponse = response;
        break;
      }
    }

    res.json({ response: fallbackResponse });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // Extract seller_id from JWT token
    const { token } = req.cookies;
    if (!token) {
      return res.json({ error: "Authentication required" });
    }

    let seller_id;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      seller_id = decoded.id;
    } catch (err) {
      return res.json({ error: "Invalid token" });
    }

    console.log('Received data:', { name, price, description, category, seller_id });
    // Validate required fields - check for empty strings too
    if (!name || !price || !description || !category || 
        name.trim() === '' || price.toString().trim() === '' || 
        description.trim() === '' || category.trim() === '') {
      console.log('Validation failed for required fields');
      return res.json({ error: "All fields are required" });
    }

    // Validate price is a positive number
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      console.log('Price validation failed:', price);
      return res.json({ error: "Price must be a valid positive number" });
    }

    // Create new item
    const newItem = new Item({
      name: name.trim(),
      price: numPrice.toFixed(2),
      description: description.trim(),
      category: category.trim(),
      seller_id: new mongoose.Types.ObjectId(seller_id)
    });

    // Save item to database
    const savedItem = await newItem.save();
    console.log('Item saved successfully:', savedItem);
    
    res.json({ 
      success: true, 
      message: "Item added successfully", 
      item: savedItem 
    });

  } catch (error) {
    console.error("Error adding item:", error);
    return res.json({ error: "Failed to add item. Please try again." });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getDetails,
  EditDetails,
  Logout,
  fetchItems,
  getName,
  addToCart,
  getCart,
  deleteItem,
  addToOrders,
  getPendingOrders,
  checkOTP,
  getOrdersHistory,
  addReview,
  clearCart,
  chatbotResponse,
  addItem,
};
