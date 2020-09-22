const Product = require('../models/Product');

const productController = {
	createProduct: async (req, res) => {
		const {	category, title, description, price, stock, ml, aclPct, pic, rating} = req.body

		const newProduct=  new Product({category, title, description, price, stock, ml, aclPct, pic, rating})

		newProduct.save()
		.then(newProduct => res.json({succes: true, newProduct}))
		.catch(error =>res.json({succes: false, error}))
	},

	modifyProduct: async (req, res) => {
		const {	category, title, description, price, stock, ml, aclPct, pic, rating} = req.body
		const id = "5f6a517949e7870d88bae908"
		Product.findByIdAndUpdate(id,{category, title, description, price, stock, ml, aclPct, pic, rating}, {returnNewDocument: true})
		.then(newProduct => res.json({succes: true, newProduct}))
		.catch(error =>res.json({succes: false, error}))
	},
	deleteProduct: async (req, res) => {
		const id =  "5f6a577609912a19ac463031"
		Product.findByIdAndDelete(id)		
		.then(productDeleted => res.json({succes: true, productDeleted}))
		.catch(error =>res.json({succes: false, error}))
	},
	getProductByCat: async (req, res) => {
		const {category} = req.body
		Product.find({category: category})
		.then(listProducts => res.json({succes: true, listProducts}))
		.catch(error =>res.json({succes: false, error}))
	},
	getProductById: async (req, res) => {
		const {id} =req.body
		Product.findById({_id: id})
		.then(productFound => res.json({succes: true, productFound}))
		.catch(error =>res.json({succes: false, error}))
	},
	getProductByWishlist: async (req, res) => {
		const {arrayIDs} =req.body
		Product.find({_id: arrayIDs})
		.then(productWishList => res.json({succes: true, productWishList}))
		.catch(error =>res.json({succes: false, error}))
	}
}

module.exports = productController