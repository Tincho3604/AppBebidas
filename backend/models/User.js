mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		require: true
	},
	lastName: {
		type: String,
		trim: true,
		require: true
	},
	mail: {
		type: String,
		required: true,
        trim: true,
        unique: true
    },
	pass: {
		type: String,
		required: true
	},
	wishlist: {
		type: Array,
		default: []
	},
	shippingAddress: {
		type: Object
	},
	billingAddress: {
		type: Object
	},
	phone: {
		type: String
	},
	role: {
		type: String,
		default: 'customer'
	}
})

const User = mongoose.model('user', userSchema);
userSchema.plugin(uniqueValidator,{ message: '{PATH} alredy used'});
module.exports = User;
