import axios from 'axios'
import { RUTA_API } from '../../constants'

const { default: Axios } = require("axios")


const productActions = {
    
    getProductByCategory: (category) => {
        
        return async(dispatch, getState) => {
        const respuesta = await axios.get(`${RUTA_API}/api/product/listProductsByCategory`,{category})
        const product = respuesta.data.listProducts
        dispatch({
            type: 'GET_PRODUCT_BY_CATEGORY',
            dispatch: product
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