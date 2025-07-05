const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    buyer_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    amount: Number,
    otp: String,
    status: String,
    item_id: Schema.Types.ObjectId,
});

const orderModel = mongoose.model('Orders', orderSchema);
module.exports = orderModel;