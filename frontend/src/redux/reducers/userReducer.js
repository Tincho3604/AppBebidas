const initialState = {
	token: '',
	firstName: '',
	lastName: '',
	wishlist: [],
	cart: [],
	shippingAddress:'',
	billingAddress:''
	
}

function userReducer(state = initialState, action) {
	switch (action.type) {
		case "USER_IN":
			localStorage.setItem("token", action.payload.token)
			return {
				...state,
				...action.payload,
			}
		case "LOGOUT_USER":
			localStorage.removeItem("token")
			return {
				...initialState
			};
		
		case "INFO_SHIPPING_ADDRESS_UPDATE":
			return{
				...state,
				shippingAddress: action.payload
			}
		
		case "INFO_BILLING_ADDRESS_UPDATE":
			return{
				...state,
				billingAddress: action.payload
			}
		

		default:
			return state
	}
}

export default userReducer;