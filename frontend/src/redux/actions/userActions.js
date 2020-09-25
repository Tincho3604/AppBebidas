import axios from "axios"
import { RUTA_API } from "../../constants"
import { toast } from "react-toastify"


const getCartItems = () => {
	let items = (localStorage.getItem('items') === null) ? [] : JSON.parse(localStorage.getItem('items'));
	return items;
}

const userActions = {
	addToCart: (id, cantidad) =>{
		return async (dispatch, getState) => {
			console.log("Add to cart action")
			console.log(id, cantidad)
			let cart = getCartItems()
			console.log(cart)
			const response = await axios.get(`${RUTA_API}/api/product/getProduct/${id}`)
			const item = response.data.productFound
			item.quantity = cantidad
			console.log(item)
			cart.push(item)
			console.log(cart)
			dispatch({
                type:'LOAD_CART',
                payload: cart
            })
		}
	},
	createUser: (user, set = null ) => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API+'/api/user/register', user)
			console.log(response)
            if(response.data.success === "false") {
                //set({status: false})
                let errors = response.data.error.errors;
				if(errors.username !== undefined) toast.error(errors.username.message);
				if(errors.mail !== undefined ) toast.error(errors.mail.message);
				return;
			}
			else {
				toast.success(`Account created!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						username: response.data.username,
						wishlist: response.data.wishlist,
					},
				})
			}
			return response
		}
	},
	addShippingAddress: (user, shippinginfo) => {
		return async (dispatch, getState) => {
		const response = await axios.post(`${RUTA_API}/api/user/addShippingAddress`,shippinginfo,user)
		const info = response.data.user
		
		if (!response.data.success) {
			toast.error(response.data.error)
			return response.data.error
		} else {
			dispatch({
				type: "INFO_SHIPPING_ADDRESS_UPDATE",
				payload: info
					})
				}
			}
	},

	addBillingAddress: (user, billinginfo) => {
		return async (dispatch, getState) => {
			const response = await axios.post(`${RUTA_API}/api/user/addBillingAddress`,billinginfo,user)
			const info = response.data.user
			
			if (!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			} else {
				dispatch({
					type: "INFO_BILLING_ADDRESS_UPDATE",
					payload: info
						})
					}
				}
			},
    getUserInfo: (user) => {
        return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/user/getInfoUser`, user)
			const info = response.data.user
			dispatch({
				type:'GET_INFO_USER',
				payload:info
			    })	
			}
	}, 
	loginUser: user => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + "/api/user/login", user)
			if (!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			} else {
				toast.success(`Welcome ${response.data.username}!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						id: response.data.id,
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						wishlist: response.data.wishlist,

					},
				})
			}
		}
	},


	logoutUser: () => {
		return (dispatch, getState) => {
			toast.info("See you later! =D")
			dispatch({
				type: "LOGOUT_USER",
			})
		}
    },
	authUser: token => {
		return async (dispatch, getState) => {
			let response
			try {
				response = await axios.get(RUTA_API + "/api/user/login", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				console.log(response)
			} catch {
				return false
			}
			const {lastName, firstName, wishlist, id} = response.data
			dispatch({
				type: "USER_IN",
				payload: {
					token,
					firstName,
					lastName,
					wishlist,
					id
				},
			})
		}
	},



	modifyUser:	user => {
		return async (dispatch, getState) => {
			const response = await axios.put(RUTA_API + "/api/user/modifyUser", user, {
				headers: {
					'Authorization': "Bearer " + getState().userReducer.token,
				}
			})
			if(response.data.success) toast.success('Cambios guardados!')
			else toast.error('Ha habido un problema')
		}
	},
	

	newComment: comment => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API+ "/api/comment/",comment)
			console.log(response, "holi")
		}
	},
	getComments: productId => {
		return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/comment/${productId}`)
			dispatch({
				type: "GET_COM",
				payload: response.data.comments,
			})
		}
	},
	deleteComment: commentId => {
		return async (dispatch, getState) => {
			const response = await axios.delete(`${RUTA_API}/api/comment/${commentId}`)
		}
	},
	editComment: edited => {
		return async (dispatch, getState) => {
			const response = await axios.put(RUTA_API + "/api/comment",	edited)
			if (response.data.success === true) toast.success("Edited comment")
			else toast.error("An error occurred")
		}
	},
}

export default userActions