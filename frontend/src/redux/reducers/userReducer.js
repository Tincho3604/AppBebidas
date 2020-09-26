const initialState = {
	id: '',
	token: '',
	firstName: '',
	lastName: '',
	shippingAddress: '',
	billingAddress: '',
	wishlist: [],
	cart: [],
	comments: null
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
		case "GET_COM":
			return {
				...state,
				comments: action.payload,
			}
		case "LOAD_CART":
			if(action.payload.length === 0) localStorage.removeItem('items')
			else localStorage.setItem('items', JSON.stringify(action.payload));
			return {
				...state,
				cart: action.payload,
			}
		
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
		
			case "WISHLIST":
			return{
				...state,
				wishlist: action.payload
			}
		default:
			return state
	}
}

export default userReducer;