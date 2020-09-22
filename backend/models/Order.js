const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: "user",
		required: true,
	},
	status: {
		type: String,
		required: true
	},
	items: {
		type: Array,
		required: true
	},
	shippingAddress: {
		type: Object,
		required: true
	},
	billingAddress: {
		type: Object,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	payment: {
		type: String
	},
	note: {
		type: String
	}
},{timestamps: true})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;