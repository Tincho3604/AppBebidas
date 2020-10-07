import axios from "axios"
import { toast } from "react-toastify"
import { RUTA_API } from "../../constants"

const orderActions = {
	createOrder: order => {
		return async (dispatch, getState) => {
			const response = await axios.post(`${RUTA_API}/api/orders`, order)
			if(response.data.success) localStorage.removeItem('items')
		}	
	}
}

export default orderActions;