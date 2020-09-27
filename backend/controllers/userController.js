const User = require("../models/User")
const nodeMailer = require('nodemailer')
const Product = require("../models/Product")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const message = "Mail or Password incorrect"



var transport = nodeMailer.createTransport({
	port:465, 
	host:"smtp.gmail.com",
	auth: {
		pass: "Dl12345*",
		user: "deluxelicoreria@gmail.com"
	},
	tls: { rejectUnauthorized: false }
})

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
					billingAddress: user.billingAddress,
					rates: user.rates
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
			billingAddress: userExists.billingAddress,
			rates: userExists.rates
		})
	},

	decodeUser: (req, res) => {
		const { firstName, lastName, wishlist, shippingAddress, billingAddress, _id, rates } = req.user
		res.json({
			firstName,
			lastName,
			wishlist,
			shippingAddress,
			billingAddress,
			id: _id,
			rates
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

		User.findOne({ _id: userId })
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
	NewPass: async (req, res) =>{
        mailSent = req.body.mail

        try{   
            await User.findOne({mail:mailSent})
            
            var length = 8
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var newPass = ""
            for (var i = 0, n = charset.length; i < length; ++i) {
                newPass += charset.charAt(Math.floor(Math.random() * n));
            }
            const passwordHashed = bcrypt.hashSync(newPass, 10)
            
                const user = await User.findOneAndUpdate({mail: mailSent}, {pass: passwordHashed})
                var mailOptions = {
                    from: "Deluxe <notresponse@notreply.com>",
                    sender: "Deluxe <notresponse@notreply.com>",
                    to: `${user.mail}`,
                    subject: "New Password",
					html:  `<div>
					<img src="https://pubelancla.es/wp-content/uploads/2015/05/whisky_pubelancla-1024x640.jpg" />
					<h1>Esta es su nueva contraseña: ${newPass}</h1>
					<h2>puede continuar su compra en Deluxe</h2>
					<h2>Vuelva a ingresar<h2>    
                    </>`,
                }
                transport.sendMail(mailOptions, (error, info) => {
                  
                    res.send("email enviado")
                })

           }catch(error){
            res.json({
                success:false,
                response: "Error getting account"
            })
        }
	},
	setRate: async (req,res) => {
		const rId = req.body.id
		const rVal = req.body.value
		let found = false
		if (req.user.rates.length > 0) {
			req.user.rates.map(rate => {
				if (rate.id === rId) {
					rate.value = rVal;
					found = true;
				}
			})
		}
		if(found) {
			req.user.save()
				.then(user => {
					res.json({
						success: true,
						rates: user.rates
					})
				})
				.catch(err => {
					res.json({
						success: false,
						err
					})
					
				}) 
		} else {
			req.user.rates.push({id: rId, value: rVal})
			req.user.save()
				.then(user => {
					res.json({
						success: true,
						rates: user.rates
					})
				})
				.catch(err => {
					res.json({
						success: false,
						err
					})
				}) 
		}
	},
	delRate: (req,res) => {
		const { id } = req.body
		req.user.rates = req.user.rates.filter(rate => rate.id !== id)
		req.user.save()
				.then(user => {
					res.json({
						success: true,
						rates: user.rates
					})
				})
				.catch(err => {
					res.json({
						success: false,
						err
					})
					
				})
	}
}
module.exports = userController
