const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    contactNumber: String,
    password: String,
    cart: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Items', required: true },
        }
    ],
    reviews: [
        {
            content: { type: String },
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        }
    ]
});



const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;