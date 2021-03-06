const Order = require('../models/Order');

const orderController = {
	createOrder: async (req, res) => {
		const newOrder = new Order({ ...req.body })

		try {
			await newOrder.save()
			res.json({
				success: true,
				response: "Order Upload"
			})
		} catch (error) {
			res.json({
				success: false,
				response: error
			})
		}
	},

	deleteOrder: async (req, res) => {
		var id = req.params.id
		try {
			const response = await Order.findByIdAndUpdate({ _id: id }, {status: "Entregado"}, {new: true})
			const data = await Order.find()
			console.log(response)
			res.json({
				success: true,
				response: data
			})
		} catch {
			res.json({
				success: false,
				response: "Error deleting Order"
			})
		}
	},

	getUserOrder: async (req, res) => {
	
		try {
			const data = await Order.find({ userId: req.user._id })
			res.json({
				success: true,
				response: data
			})
		} catch {
			res.json({
				success: false,
				response: "Error get order by user"
			})
		}
	},


	getOrderById: async (req, res) => {
	
		var id = req.params.id
		try {
			const data = await Order.find({ _id: id })
			res.json({
				success: true,
				response: data
			})

		} catch {

			res.json({
				success: false,
				response: "Error Getting Order"
			})
		}
	},

	getAllOrders: async (req, res) => {
		console.log("hola")
		try {
			const data = await Order.find()
			res.json({
				success: true,
				response: data
			})
		} catch {
			res.json({
				success: false,
				response: "Error Load Orders"
			})
		}
	}
}

module.exports = orderController