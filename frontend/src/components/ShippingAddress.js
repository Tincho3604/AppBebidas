import React, { useState } from 'react'

const ShippingAddress = () => {

const [shipAddress, setAddress] = useState({
    street: "",
    number:"",
    floor:"",
    apartment:"",
})

const [error, setError] = useState({
    street: "",
    number:"",
    floor:"",
    apartment:"",
})

const [send, setSend] = useState({
    status: false
})


const validation = shipAddress => {
    error.ok = true
    //RegEx
    
    const alphanum = RegExp(/^\w+$/)
    const num = RegExp(/\d.{1,}/)
    

    //Street
    
    if (shipAddress.street === '') {
        error.street = 'Cannot be empty'
        error.ok = false
    }
    else if (shipAddress.street < 3) {
        error.street = 'Need three characters at least'
        error.ok = false
    }
    else if (!alphanum.test(shipAddress.street)) {
        error.street = 'Only can contains letters and numbers'
        error.ok = false
    }
    else error.title = ''
    


    //Number
    if (shipAddress.number === '') {
        error.number = 'Cannot be empty'
        error.ok = false
    }
    else if (!num.test(shipAddress.number)) {
        error.number = 'Only can contains numbers'
        error.ok = false
    }
    else error.number = ''
    
    

    //Floor
    if (shipAddress.floor === '') {
        error.number = 'Cannot be empty'
        error.ok = false
    }
    else if (!num.test(shipAddress.floor)) {
        error.number = 'Only can contains numbers'
        error.ok = false
    }
    else error.number = ''
    


     //Apartment
    if (shipAddress.apartment === '') {
        error.apartment = 'Cannot be empty'
        error.ok = false
    }
    else if (shipAddress.street === 1) {
        error.street = 'Need three characters at least'
        error.ok = false
    }
    else if (!alphanum.test(shipAddress.apartment)) {
        error.apartment = 'Only can contains letters and numbers'
        error.ok = false
    }
    else error.apartment = ''
    
    console.log(error)

    return error.ok
}


const handleChange = e => {
    
    setAddress({
        ...shipAddress,
        [e.target.name]: e.target.value
    })
console.log(e.target.value)
}

const handleClick = e => {
    e.preventDefault();
    send.status = true
    setSend({ status: true })
    if (validation(shipAddress)) {
        const fd = new FormData()
        fd.append("street",shipAddress.street)
        fd.append("number",shipAddress.number)
        fd.append("floor",shipAddress.floor)
        fd.append("apartment",shipAddress.apartment)
        
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
                    <label for="street">Street:</label>
                    <input type="text" name="street" onChange={handleChange}></input>
                    
                    <div className="inputs">
                        <label for="number">Number:</label>
                        <input type="number" name="number" onChange={handleChange}></input>
                    </div>
                    
                    <div className="inputs">
                        <label for="floor">Floor:</label>
                        <input type="text" name="floor" onChange={handleChange}></input>
                    </div>
                        
                    <div className="inputs">
                        <label for="apartment">Apartment:</label>
                        <input type="text" name="apartment" onChange={handleChange}></input>
                    </div>
                
                </div>
            </div>


                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleClick}>Send Info</button>
        
        
        </div>
    
    </>
    )
}

export default ShippingAddress 

