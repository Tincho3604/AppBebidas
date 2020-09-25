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
					urlPic: user.urlPic,
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
		const { urlPic, firstName, lastName, wishlist } = req.user
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
    }

}
module.exports = userController
