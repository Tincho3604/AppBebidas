const Order = require('../models/Order');

const orderController = {
	createOrder: async (req, res) => {
	var {userId, items, shippingAddress, billingAddress, phone, payment, note} = req.body
	const newOrder = new Order({
		userId,
		items,
		shippingAddress,
		billingAddress,
		phone,
		payment,
		note
	})

	try{
		await newOrder.save()
		res.json({
			success:true,
			response: "Order Upload"
		})
	}catch(error){
		res.json({
			success: false,
			response: error
		    })
	    }
	},



	
	modifyOrder: async (req, res) => {
	var id = req.params.id

	var {items, shippingAddress, billingAddress, phone, payment, note} = req.body
	try{
		await Order.findOneAndUpdate(
				{_id:id},
				{items, shippingAddress, billingAddress, phone, payment, note}
			)
			res.json({
				success:true,
				response:"Order Modify"
			})
	    }catch{
			res.json({
				success:false,
				response:"Error modify Order"
			})
		}
    },
	



	deleteOrder: async (req, res) => {
	var id = req.params.id
	    try{
		await Order.findByIdAndDelete({_id: id})
		res.json({
			success: true,
			response: "Order Deleted"
		})
	    }catch{
			res.json({
				success: false,
				response:"Error deleting Order"
			})
		}
	},
	


	
	
	getUserOrder: async (req, res) => {
	try{
		const data = await Order.find({userId: req.user._id})
	    res.json({
			success:true,
			response: data
		    })
	    }catch{
			res.json({
				success:false,
				response:"Error get order by user"
			})
		}
    },
	

	getOrderById: async (req, res) => {
		var id = req.params.id
		try{
			const data = await Order.find({_id: id})
			res.json({
				success: true,
				response: data
			})
		
		}catch{
		
			res.json({
				success:false,
				response:"Error Getting Order"
			})
		}
	},
	
	getAllOrders: async (req, res) => {
        try {
			const data = await Order.find()
			res.json({
				success: true,
				response:data
			})
		}catch{
			res.json({
				success:false,
				response:"Error Load Orders"
			})
		}
	}
}

module.exports = orderController