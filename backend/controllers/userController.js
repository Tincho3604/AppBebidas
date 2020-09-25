const User = require("../models/User")
const Product = require("../models/Product")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const message = "Mail or Password incorrect"

const userController = {
	createUser: async (req, res) => {
		const { pass } = req.body
		// Creating new User
		const newUser = new User({ ...req.body })
		newUser.pass = bcrypt.hashSync(pass.trim(), 10)
		newUser
			.save()
			.then(user => {
				const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {})
				if (!token)
					return res.json({
						success: false,
						error: "An error occurred while saving the user",
					})
				res.json({
					success: true,
					token,
					firstName: user.firstName,
					lastName: user.lastName,
					wishlist: user.wishlist,
				})
			})
			.catch(err => res.json({ success: "false", error: err }))
	},
	loginUser: async (req, res) => {
		const { mail, pass } = req.body
        console.log(req.body)
		const userExists = await User.findOne({ mail })
		if (!userExists) return res.json({ success: false, error: message })
		const passwordMatches = bcrypt.compareSync(pass, userExists.pass)
		console.log(passwordMatches, "password")
		if (!passwordMatches) return res.json({ success: false, error: message })
		const token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
		if (!token) return res.json({ success: false, error })

		res.json({
			success: true,
			token,
			firstName: userExists.firstName,
			lastName: userExists.lastName,
			wishlist: userExists.wishlist,
			id: userExists._id,
		})
	},
	
	decodeUser: (req, res) => {
		const {firstName, lastName, wishlist } = req.user
		res.json({
			firstName,
			lastName,
			wishlist,
		})
	},
	

    editUser: (req , res) =>{
        User.findOneAndUpdate({_id: req.user._id },{...req.body},{new:true})
		.then(user => res.json({ success: true, user }))
        .catch(err => {
			res.json({success:true, error: err})
		}) 
	},
	
	

	
	userInfo: (req, res) => {
	var userId = req.user._id

		const usuarioUser = User.findOne({_id: userId})
		

		.then(usuarioUser => res.json({
			success: true,
			token,
			firstName: usuarioUser.firstName,
			wishlist: usuarioUser.wishlist,
            phone: usuarioUser.phone
            
		}))
		.catch(error => res.json({success: false, error}))
	},


	
	addToWishlist: async (req, res) => {
		var id = req.params.id
		var userId = req.user._id
		
		try{
		
			var user = await User.findOne({_id: userId})
		
		if(!user){
			res.json({
				success:false,
				response: "User Not found"
			})
		}
		
		var product = await Product.findOne({_id: id})
		if(!product){
			res.json({
				success: false,
				response: "Product not found"
			})
		}
		

		if(!user.wishlist.includes(id)){
			user.wishlist.push(id)
			
			// await User.updateOne({_id:idUser}, {wish})

			await user.save()
		}
		

	}catch(error){
            res.json({
                success: false,
                response: error
		})
	}
},




	removeToWishlist: async (req, res) => {
        var id = req.params.id
		var userId = req.user._id
		
		try{
			var user = await User.findOne({_id: userId})
			if(!user){
				res.json({
					success:false,
					response: "User Not found"
				})
			}
			
			var product = await Product.findOne({_id: id})
			if(!product){
				res.json({
					success: false,
					response: "Product not found"
				})
			}
			
			if(user.wishlist.includes(id)){
			var wish = user.wishlist

			user.wishlist = user.wishlist.filter(product => product != id) 

			await user.save()
			
		}
		}catch(error){
		    res.json({
			    success: false,
			    response: error
		    })
	    }
	},


	addShippingAddress: async (req, res) => {
		var id = req.params.id
		var userId = res.user._id
		
		const data = {street,number,floor,apartment} = req.body
		
		try {
			var user = await  User.findOne({_id: userId}, {shippingAddress: req.body})
			res.json({
				success: true,
				response: user
			})

		}catch(error){
		    res.json({
			    success: false,
			    response: error
		    })
			
		}
	},

	addBillingAddress: async (req, res) => {
		var id = req.params.id
		var userId = res.user._id
		
		const data = {street,number,floor,apartment} = req.body
		
		try {
			var user = await  User.findOne({_id: userId}, {billingAddress: req.body})
			res.json({
				success: true,
				response: user
			})

		}catch(error){
		    res.json({
			    success: false,
			    response: error
		    })
			
		}
	},



}
module.exports = userController
