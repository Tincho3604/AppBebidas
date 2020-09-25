import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CATEGORIES } from "../constants"
import productActions from "../redux/actions/productActions"



const EditProduct = (props) => {

    const [product, setProduct] = useState({
        category: "",
        title: "",
        price: "",
        ml: "",
        rating: "",
        pic: "",
        alcPct: "",
        stock: "",
        description: ""
    })
    const [error, setError] = useState({
        category: "",
        title: "",
        price: "",
        ml: "",
        pic: "",
        alcPct: "",
        stock: "",
        description: ""
    })
    const [send, setSend] = useState({
        status: false
    })

    useEffect(() => {
        

        
    
           
       },[]) 
       console.log(props)
    const validation = product => {
        error.ok = true
        //RegEx
        const alphanum = RegExp(/^\w+$/)
		const num = RegExp(/\d.{1,}/)
		const decimals = RegExp(/^([0-9]+(\.?[0-9]?[0-9]?)?)/)
        //category
        if (product.category === '') {
            error.category = 'Cannot be empty'
            error.ok = false
        }
        else if (product.title.length < 3) {
            error.category = 'Need three characters at least'
            error.ok = false
        }
        // else if (!alphanum.test(product.title)) {
        //     error.title = 'Only can contains letters and numbers'
        //     error.ok = false
        // }
        else error.title = ''
        //description
        if (product.description === '') {
            error.description = 'Cannot be empty'
            error.ok = false
        }
        else if (product.title.length > 30) {
            error.description = 'Need thirty characters at least'
            error.ok = false
        }
        // else if (!alphanum.test(product.description)) {
        //     error.description = 'Only can contains letters and numbers'
        //     error.ok = false
        // }
        else error.title = ''
        // price
        if (product.price === '') {
            error.price = 'Cannot be empty'
            error.ok = false
        }
        else if (!num.test(product.price)) {
            error.price = 'Only can contains numbers'
            error.ok = false
        }
        else error.price = ''
        // Pic
        if (product.pic === '') {
            error.pic = 'Cannot be empty'
            error.ok = false
        } else {
            error.pic = ""
        }
        if (product.ml === '') {
            error.ml = 'Cannot be empty'
            error.ok = false
        }
        else if (!num.test(product.ml)) {
            error.ml = 'Only can contains numbers'
            error.ok = false
        }
        else error.ml = ''
        if (product.stock === '') {
            error.stock = 'Cannot be empty'
            error.ok = false
        }
        // else if (!num.test(product.stock)) {
        //     error.stock = 'Only can contains numbers'
        //     error.ok = false
        // }
        else error.stock = ''
        // alcPct

        if (product.alcPct === '') {
            error.alcPct = 'Cannot be empty'
            error.ok = false
        }

        else if (!decimals.test(product.alcPct)) {
            error.alcPct = 'Only can contains numbers'
            error.ok = false
        }
        else error.alcPct = ''
        //return

        return error.ok
    }




    const handleChange = e => {
        const valor = e.target.name === "pic" ? e.target.files[0] : e.target.value

        setProduct({
            ...product,
            [e.target.name]: valor
        })
    }
    const handleClick = async e => {
        e.preventDefault();
        send.status = true
        setSend({ status: true })
        if (validation(product)) {
           
            const {id} = props.match.params
            const fd = new FormData()
            fd.append("category", product.category)
            fd.append("price", product.price)
            fd.append("alcPct", product.alcPct)
            fd.append("ml", product.ml)
            fd.append("stock", product.stock)
            fd.append("description", product.description)
            fd.append("pic", product.pic)
            fd.append("rating", product.rating)
            fd.append("title", product.title)
          

            await props.editProduct(fd, id)

            setError({
                ...error,
                ok: true
            })
        }
        else {
            send.status = false
            setSend({ status: false })
            setError({
                ...error,
                ok: false
            })
            alert("ERROR")
        }

    }
    
    return (

        <>
       {/* AGREGAR VALUES CON PROPS DE LA ACCION AL OBTENER DATOS DE UN PRODUCTO ASI SE RENDERIZAN AL QUERER EDITAR UN PRODUCTO */}
	   <div className="container">
					<form className="form">
						<h2>Create your product</h2>
						<div className="inputBox">
							<label for="category">Categoria:</label>
							<select name="category" onChange={handleChange} value={product.category}>
								<option> - Seleccionar Categoria - </option>
								{CATEGORIES.map(category => {
									return <option value={category.foto}>{category.nombre}</option>
								})}
							</select>
						</div>
                        <div className="inputBox">
                            <label for="title">Titulo:</label>
                            <input type="text" name="title" onChange={handleChange} value={product.title}></input>
                        </div>
                        <div className="inputBox">
                            <label for="description">Descripción:</label>
                            <input type="text" name="description" onChange={handleChange} value={product.description}></input>
                        </div>
                        <div className="inputBox">
                            <label for="price">Precio:</label>
                            <input type="number" name="price" onChange={handleChange} value={product.price}></input>
                        </div>
                        <div className="inputBox">
                            <label for="stock">Stock:</label>
                            <input type="number" name="stock" onChange={handleChange} value={product.stock}></input>
                        </div>
                        <div className="inputBox">
                            <label for="ml">Mililitros:</label>
                            <input type="number" name="ml" onChange={handleChange} value={product.ml}></input>
                        </div>
                        <div className="inputBox">
                            <label for="alcPct">Porcentaje Alcoholico (%):</label>
                            <input type="number" name="alcPct" onChange={handleChange} value={product.alcPct}></input>
                        </div>
                        <div className="inputBox">
                            <label for="pic">Foto del producto:</label>
                            <input type="file" name="pic" onChange={handleChange}></input>
                        </div>

                		<button onClick={handleClick}>Enviar datos</button>
                    </form>
            </div>

        </>
    )



}

const mapStateToProps = state => {
    return {
    productData: state.productReducer.productFound
    }
}

const mapDispatchToProps = {
    dataProduct: productActions.dataProduct,
    editProduct: productActions.editProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)