import React, { useState } from "react"



const CreateProduct = () => {

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
        rating: "",
        pic: "",
        alcPct: "",
        stock: "",
        description: ""
    })
    const [send, setSend] = useState({
        status: false
    })


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
        console.log(error)
        return error.ok
    }




    const handleChange = e => {
        const valor = e.target.name === "pic" ? e.target.files[0] : e.target.value

        setProduct({
            ...product,
            [e.target.name]: valor
        })
    }
    const handleClick = e => {
        e.preventDefault();
        send.status = true
        setSend({ status: true })
        if (validation(product)) {
            const fd = new FormData()
            fd.append("category",product.category)
            fd.append("price",product.price)
            fd.append("alcPct",product.alcPct)
            fd.append("ml",product.ml)
            fd.append("stock",product.stock)
            fd.append("description",product.description)
            fd.append("pic",product.pic)
            fd.append("rating",product.rating)
            fd.append("title",product.title)

            //ACCION
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
            <div id="mainContainerProduct">
                <h1>Create your product</h1>
                <div className="formContainer">
                    <div className="inputs">
                        <label for="category">Category:</label>
                        <input type="text" name="category" onChange={handleChange}></input>
                        <div className="inputs">
                            <label for="title">Title:</label>
                            <input type="text" name="title" onChange={handleChange}></input>
                        </div>
                        <div className="inputs">
                            <label for="description">Description:</label>
                            <input type="text" name="description" onChange={handleChange}></input>
                        </div>
                        <div className="inputs">
                            <label for="price">Price:</label>
                            <input type="number" name="price" onChange={handleChange}></input>
                        </div>
                        <div className="inputs">
                            <label for="stock">Stock:</label>
                            <input type="number" name="stock" onChange={handleChange}></input>
                        </div>
                        <div className="inputs">
                            <label for="ml">ml:</label>
                            <input type="number" name="ml" onChange={handleChange}></input>
                        </div>
                        <div className="inputs">
                            <label for="aclPct">aclPct:</label>
                            <input type="number" name="alcPct" onChange={handleChange}></input>
                        </div>
                        <div className="inputs">
                            <label for="pic">Pic:</label>
                            <input type="file" name="pic" onChange={handleChange}></input>
                        </div>
                    
                    </div>

                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleClick}><img src={require("../pokebola.png")} style={{ width: "150px" }}></img></button>
            </div>


        </>
    )

}

export default CreateProduct