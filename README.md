# Project Overview

This project is a web application that allows users to buy and sell items. Below is a brief description of the functionalities implemented:

## Authentication
- **User Registration**: Users can register by providing their details such as name, email, password, etc.
- **User Login**: Registered users can log in using their email and password. JWT tokens are used for authentication.

## Item Management
- **Add Item**: Sellers can add new items to sell by providing details such as name, price, description, and category.
- **View Items**: Users can view all available items. Items sold by the logged-in seller are excluded from the search results.

## Cart Management
- **Add to Cart**: Users can add items to their cart.
- **View Cart**: Users can view items in their cart along with the total price.
- **Remove from Cart**: Users can remove items from their cart.

## Transactions
- **Buy Items**: Users can buy items in their cart. An OTP is generated for the transaction, which the seller must enter to complete the sale.
- **Verify OTP**: Sellers can verify the OTP to complete the transaction.

## Order History
- **View Order History**: Users can view their order history, including items sold, pending orders, and completed orders.
- **Add Review**: Users can add reviews for sellers from their order history.

## Search Functionality
- **Search Items**: Users can search for items by name or category. The search is case-insensitive and filters items based on the input query.

## Additional Features
- **View Item Details**: Users can view detailed information about an item by clicking the "View Item" button.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used
- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)