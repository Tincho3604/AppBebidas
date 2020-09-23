const Product = require('../models/Product');

const productController = {
	createProduct: async (req, res) => {
		const {	category, title, description, price, stock, ml, aclPct, pic, rating} = req.body

		const newProduct=  new Product({category, title, description, price, stock, ml, aclPct, pic, rating})

		newProduct.save()
		.then(newProduct => res.json({success: true, newProduct}))
		.catch(error =>res.json({success: false, error}))
	},

	modifyProduct: async (req, res) => {
		const {	category, title, description, price, stock, ml, aclPct, pic, rating} = req.body
		const id = req.params.id
		const newProduct = await Product.findByIdAndUpdate(id,{category, title, description, price, stock, ml, aclPct, pic, rating}, {returnNewDocument: true})
		
		.then(newProduct => res.json({success: true, newProduct}))
		.catch(error =>res.json({success: false, error}))
	},
	deleteProduct: async (req, res) => {
		const id =  req.params.id
		const productDeleted = await Product.findByIdAndDelete(id)
				
		.then(productDeleted => res.json({success: true, productDeleted}))
		.catch(error =>res.json({success: false, error}))
	},
	getProductByCat: async (req, res) => {
		const {category} = req.body
		Product.find({category: category})
		.then(listProducts => res.json({success: true, listProducts}))
		.catch(error =>res.json({success: false, error}))
	},
	getProductById: async (req, res) => {
		const {id} =req.body
		Product.findById({_id: id})
		.then(productFound => res.json({success: true, productFound}))
		.catch(error =>res.json({success: false, error}))
	},
	getProductByWishlist: async (req, res) => {
		const {arrayIDs} =req.body
		Product.find({_id: arrayIDs})
		.then(productWishList => res.json({success: true, productWishList}))
		.catch(error =>res.json({success: false, error}))
	}
}

module.exports = productController