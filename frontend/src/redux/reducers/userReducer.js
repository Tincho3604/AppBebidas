const initialState = {
	urlPic: '',
	token: '',
	username: '',
    wishlist: []
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
		default:
			return state
	}
}

export default userReducer;