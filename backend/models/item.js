const mongoose = require('mongoose');
const {Schema} = mongoose;

const itemSchema = new Schema({
    name: String,
    price: String,
    description: String,
    category: String,
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
});

const itemModel = mongoose.model('Items', itemSchema);
module.exports = itemModel;