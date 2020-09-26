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
					id: user._id,
					wishlist: user.wishlist,
					shippingAddress: user.shippingAddress,
					billingAddress: user.billingAddress
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
			shippingAddress: userExists.shippingAddress,
			billingAddress: userExists.billingAddress
		})
	},

	decodeUser: (req, res) => {
		const { firstName, lastName, wishlist, shippingAddress, billingAddress, _id } = req.user
		res.json({
			firstName,
			lastName,
			wishlist,
			shippingAddress,
			billingAddress,
			id: _id
		})
	},


	editUser: (req, res) => {
		User.findOneAndUpdate({ _id: req.user._id }, { ...req.body }, { new: true })
			.then(user => res.json({ success: true, user }))
			.catch(err => {
				res.json({ success: true, error: err })
			})
	},




	userInfo: (req, res) => {
		var userId = req.user._id

		const usuarioUser = User.findOne({ _id: userId })


			.then(usuarioUser => res.json({
				success: true,
				token,
				firstName: usuarioUser.firstName,
				wishlist: usuarioUser.wishlist,
				phone: usuarioUser.phone

			}))
			.catch(error => res.json({ success: false, error }))
	},



	addToWishlist: async (req, res) => {
		var {id}= req.body
		var userId = req.user._id

		const userWishList = await User.findOneAndUpdate({ _id: userId }, { $push: {wishlist: [id] } }, { new: true })
	
		res.json({
			success:true,
			wishlist:userWishList.wishlist
		})

	},




	removeToWishlist: async (req, res) => {
		var id = req.params.id
		var userId = req.user._id
		const userWishList= await User.findById({_id:userId})

		const filteredWishList= userWishList.wishlist.filter(wishlist => wishlist != id)
		// console.log(filteredWishList)
		const user = await User.findOneAndUpdate({_id:userId}, {wishlist: filteredWishList}, {new: true})
		res.json({
			success:true,
			wishlist:user.wishlist
		})
	},


	addShippingAddress: async (req, res) => {
		var id = req.params.id
		var userId = res.user._id

		const data = { street, number, floor, apartment } = req.body

		try {
			var user = await User.findOne({ _id: userId }, { shippingAddress: req.body })
			res.json({
				success: true,
				response: user
			})

		} catch (error) {
			res.json({
				success: false,
				response: error
			})

		}
	},

	addBillingAddress: async (req, res) => {
		var id = req.params.id
		var userId = res.user._id

		const data = { street, number, floor, apartment } = req.body

		try {
			var user = await User.findOne({ _id: userId }, { billingAddress: req.body })
			res.json({
				success: true,
				response: user
			})

		} catch (error) {
			res.json({
				success: false,
				response: error
			})

		}
	},



}
module.exports = userController
