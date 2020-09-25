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
console.log(id)
        return async (dispatch, getState) => {
            const response = await axios.post(RUTA_API + "/api/product/getProduct",{id: id})

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
    getProductByCategory: category => {
        
        return async(dispatch, getState) => {
        const respuesta = await axios.get(`${RUTA_API}/api/products/${category}`)
        const products = respuesta.data.listProducts
        dispatch({
            type: 'GET_PRODUCT_BY_CATEGORY',
            dispatch: products
            })
        }
    },

    getAllProducts: () => {
        return async(dispatch, getState) => {
            const respuesta = await axios.get(`${RUTA_API}/api/product/listProducts`)
            const allProduct = respuesta.data.list
            dispatch({
                type:'GET_ALL_PRODUCTS',
                dispatch: allProduct
            })
        }
    },
}

export default productActions