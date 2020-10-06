import axios from "axios"
import { toast } from "react-toastify"
import { RUTA_API } from "../../constants"

const orderActions = {
	
	addShippingOrderInfo: (shipping) => {
		return async (dispatch, getState) => {
			dispatch({
					type: "SET_SHIPPING",
					payload: shipping
				})
			}
	},
	addBillingOrderInfo: (billing) => {
		return async (dispatch, getState) => {
			dispatch({
				type: "SET_BILLING",
				payload: billing
			})
		}
	},
	createOrder: order => {
		return async (dispatch, getState) => {
			const response = await axios.post(`${RUTA_API}/api/createOrder`, order)
			if(response.data.success) localStorage.removeItem('items')
		}	
	}
}

export default orderActions;