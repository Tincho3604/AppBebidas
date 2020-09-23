const initialState = {
	productFound:{}
}

function productReducer(state = initialState, action) {
	switch (action.type) {
		case "DATA_PRODUCT":
			
			return {
				...state,
				productFound: action.payload,
			}
		
		default:
			return state
	}
}

export default productReducer;