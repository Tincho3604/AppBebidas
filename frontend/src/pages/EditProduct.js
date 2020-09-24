import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
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
        
        const {id} = props.match.params
           props.dataProduct("5f6baa40353b272460f03bb7")
        
    
           
       },[]) 
       console.log(props)
    const validation = product => {
        error.ok = true
        //RegEx
        const alphanum = RegExp(/^\w+$/)
        const num = RegExp(/\d.{1,}/)
        //category
        if (product.category === '') {
            error.category = 'Cannot be empty'
            error.ok = false
        }
        else if (product.title.length < 3) {
            error.category = 'Need three characters at least'
            error.ok = false
        }
        else if (!alphanum.test(product.title)) {
            error.title = 'Only can contains letters and numbers'
            error.ok = false
        }
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
        else if (!alphanum.test(product.title)) {
            error.title = 'Only can contains letters and numbers'
            error.ok = false
        }
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
        else if (!num.test(product.stock)) {
            error.stock = 'Only can contains numbers'
            error.ok = false
        }
        else error.stock = ''
        // alcPct

        if (product.alcPct === '') {
            error.alcPct = 'Cannot be empty'
            error.ok = false
        }

        else if (!num.test(product.alcPct)) {
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
         <div id="mainContainerProduct">
         <h1>EDITAR PRODUCTO</h1>
                <div className="formContainer">
                    <div className="inputs">
                        <label for="category">Category:</label>
                        <input type="text" name="category" onChange={handleChange} value={props.productData.category}></input>
                        <div className="inputs">
                            <label for="title">Title:</label>
                            <input type="text" name="title" onChange={handleChange} value = {props.productData.title}></input>
                        </div>
                        <div className="inputs">
                            <label for="description">Description:</label>
                            <input type="text" name="description" onChange={handleChange} value={props.productData.description}></input>
                        </div>
                        <div className="inputs">
                            <label for="price">Price:</label>
                            <input type="number" name="price" onChange={handleChange} value={props.productData.price}></input>
                        </div>
                        <div className="inputs">
                            <label for="stock">Stock:</label>
                            <input type="number" name="stock" onChange={handleChange} value={props.productData.stock}></input>
                        </div>
                        <div className="inputs">
                            <label for="ml">ml:</label>
                            <input type="number" name="ml" onChange={handleChange} value={props.productData.ml}></input>
                        </div>
                        <div className="inputs">
                            <label for="alcPct">alcPct:</label>
                            <input type="number" name="alcPct" onChange={handleChange} value={props.productData.alcPct}></input>
                        </div>
                        <div className="inputs">
                            <label for="pic">Pic:</label>
                            <input type="file" name="pic" onChange={handleChange} ></input>
                        </div>

                    </div>

                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleClick}><img src={require("../pokebola.png")} style={{ width: "150px" }}></img></button>
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