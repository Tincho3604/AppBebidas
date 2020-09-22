const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	ml: {
		type: Number,
		required: true
	},
	aclPct: {
		type: Number,
		required: true
	},
	pic: {
		type: String,
		required: true
	},
	rating: {
		type: Array,
		default: []
	}
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;