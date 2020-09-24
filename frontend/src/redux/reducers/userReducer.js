const initialState = {
	urlPic: '',
	token: '',
	firstName: '',
	lastName: '',
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
		default:
			return state
	}
}

export default userReducer;