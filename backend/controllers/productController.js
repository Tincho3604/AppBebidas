const Product = require('../models/Product');

const productController = {
	createProduct: async (req, res) => {
		const {	category, title, description, price, stock, ml, aclPct, pic, rating} = req.body

		const newProduct=  new Product({category, title, description, price, stock, ml, aclPct, pic, rating})

		newProduct.save()
		res.json({succes: true, newProduct})
		
	},

	modifyProduct: async (req, res) => {
		const {	category, title, description, price, stock, ml, aclPct, pic, rating} = req.body
		const id = req.body
		const newProduct = await Product.findByIdAndUpdate(id,{category, title, description, price, stock, ml, aclPct, pic, rating}, {returnNewDocument: true})
		
		.then(newProduct => res.json({succes: true, newProduct}))
		.catch(error =>res.json({succes: false, error}))
	},
	deleteProduct: async (req, res) => {
		const id =  req.body
		const productDeleted = await Product.findByIdAndDelete(id)
				
		.then(productDeleted => res.json({succes: true, productDeleted}))
		.catch(error =>res.json({succes: false, error}))
	},
	getProductByCat: async (req, res) => {
		const {category} = req.body
		
		const listProducts = await Product.find({category: category})
		.then(listProducts => res.json({succes: true, listProducts}))
		.catch(error =>res.json({succes: false, error}))
	},
	getProductById: async (req, res) => {
		const {id} =req.body
		
		const productFound = await Product.findById({_id: id})
		.then(productFound => res.json({succes: true, productFound}))
		.catch(error =>res.json({succes: false, error}))
	},
	getProductByWishlist: async (req, res) => {
		const {arrayIDs} =req.body
		
		const productWishList = await Product.find({_id: arrayIDs})
		.then(productWishList => res.json({succes: true, productWishList}))
		.catch(error =>res.json({succes: false, error}))
	}
}

module.exports = productController