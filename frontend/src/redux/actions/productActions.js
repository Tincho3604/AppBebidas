import axios from "axios"
import { RUTA_API } from "../../constants"


const productActions = {
    createProduct: (fd) => {
        console.log(fd)
        return async (dispatch, getState) => {
            const response = await axios.post(RUTA_API + "/api/product/createProduct", fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            })

        }
    },
    dataProduct: id=> {

        return async (dispatch, getState) => {
            const response = await axios.post(RUTA_API + "/api/product/getProduct", {id: id })

            dispatch({
				type: "DATA_PRODUCT",
				payload: response.data.productFound
			})
        }
    },
    editProduct: (fd, id) => {
        console.log(fd)
        return async (dispatch, getState) => {
            const response = await axios.put(RUTA_API + "/api/product/editProduct", fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            })

        }
    },
}

export default productActions