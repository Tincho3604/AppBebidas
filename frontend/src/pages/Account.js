import React, { useEffect, useReducer, useState } from 'react';
import { connect } from "react-redux"
import "../styles/account.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import userActions from '../redux/actions/userActions';
import productActions from '../redux/actions/productActions';
import ProductLike from  "../components/productLike";

function Account(props) {

    const [editInfo, setEditInfo] = useState({
        editInfo: false,

    })
    const [user, setUser] = useState({

    })
  
    
useEffect(()=>{
    props.productsList()
},[])



    const handleClick = e => {
        if (editInfo.editInfo === false) {
            setUser({
                ...user,
                firstName: props.firstName,
                lastName: props.lastName,
                street: props.shippingAddress.street,
                streetFAC: props.billingAddress.streetFAC,
                floor: props.shippingAddress.floor,
                floorFAC: props.billingAddress.floorFAC,
                apartament: props.shippingAddress.apartament,
                apartamentFAC: props.billingAddress.apartamentFAC,
                numberStreet: props.shippingAddress.numberStreet,
                numberStreetFAC: props.billingAddress.numberStreetFAC,
                phone: props.phone

            })

            setEditInfo({
                editInfo: true
            })
        } else {
            setEditInfo({
                editInfo: false
            })
        }

    }
    const newValue = e => {
        const value = e.target.value
        setUser({
            ...user,
            [e.target.name]: value
        })
    }

    const handlData = e => {
        const valor = e.target.name === "pic" ? e.target.files[0] : e.target.value

        setUser({
            ...user,
            [e.target.name]: valor
        })
    }
    const SendInfo = async e => {
        e.preventDefault();
        // send.status = true
        // setSend({ status: true })
        // if (validation(user)) {

        props.modifyUser(user)

        // setError({
        //     ...error,
        //     ok: true
        // })
        setEditInfo({
            editInfo: false
        })

    }

    
    console.log(props)
    // nombre apellido mail telefono direccion calle number floor apartamento
    return (
        <>
            <Header />
            <div className="generaAccount" >
                <div className="myInfo">
                    {/*<div className="yourProfilePhoto">
                    {editInfo.editInfo ?<input type="file" name="pic" onChange={handlData}></input> : <div>PHOTO</div> }
                </div>*/}
                    <div className='title'>Tus Datos</div>
                    <div className="yourProfileInfo" >
                        <div className="myPersonalInfo">
                            <div className="theInfo">  {editInfo.editInfo ? <input type="text" name="firstName" placeholder="Nombre" onChange={handlData} value={user.firstName}></input> : <p><span>Nombre: </span>{props.firstName}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="lastName" placeholder="Apellido" onChange={handlData} value={user.lastName}></input> : <p><span>apellido:</span> {props.lastName}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="phone" placeholder="Celular" onChange={handlData} value={user.phone}></input> : <p><span>Telefono:  {props.phone}</span></p>}</div>
                        </div>
                        <div className="buttonsInfo">
                            <div className="theInfo">  {editInfo.editInfo ? <button onClick={SendInfo} >Guardar informacion</button> : <button onClick={handleClick} >Editar perfil</button>}</div>
                            <div className="theInfo">  {editInfo.editInfo ? <button onClick={handleClick} className="cancelButton" >Cancelar</button> : <button onClick={handleClick} disabled className="cancelButton" >Cancelar</button>}</div>
                        </div>
                    </div>
                </div>
                <div className="myBillingInfo">
                    <div ><div className='title'>Direccion de Envio</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="street" placeholder="Calle" onChange={handlData} value={user.street}></input> : <p>Calle: {props.shippingAddress.street}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="numberStreet" placeholder="Numero de calle" onChange={handlData} value={user.numberStreet}></input> : <p>Nro.: {props.shippingAddress.numberStreet}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="floor" placeholder="Piso" onChange={handlData} value={user.floor}></input> : <p>Piso: {props.shippingAddress.floor}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="apartament" placeholder="apartamento" onChange={handlData} value={user.apartament}></input> : <p>Apartamento: {props.shippingAddress.apartament}</p>}</div>
                    </div>
                    <div><div className='title'>Direccion de facturacion</div>
                        <div className="theInfo">   {editInfo.editInfo ? <input type="text" name="streetFAC" placeholder="Calle" onChange={handlData} value={user.streetFAC}></input> : <p>Calle: {props.billingAddress.streetFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="numberStreetFAC" placeholder="Numero de calle" onChange={handlData} value={user.numberStreetFAC}></input> : <p>Nro.: {props.billingAddress.numberStreetFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="floorFAC" placeholder="Piso" onChange={handlData} value={user.floorFAC}></input> : <p>Piso: {props.billingAddress.floorFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="apartamentFAC" placeholder="apartamento" onChange={handlData} value={user.apartamentFAC}></input> : <p>Apartamento: {props.billingAddress.apartamentFAC}</p>}</div>
                    </div>
                    <div><div className='title'>Productos que deseo</div>
                    
                     {props.productFound.length === undefined?
                     
                     <p>No products available</p>:
                     
                     props.productFound.map(product =>{
                         if(props.wishlist.includes(product._id)){
                              
                            return  <>
                       <p><ProductLike producto = {product} />  </p> 
                       </>
                            
                         }
                  
                    }) 
                     }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
const mapStateToProps = state => {
    return {

        firstName: state.userReducer.firstName,
        lastName: state.userReducer.lastName,
        shippingAddress: state.userReducer.shippingAddress,
        billingAddress: state.userReducer.billingAddress,
        phone: state.userReducer.phone,
        wishlist: state.userReducer.wishlist,
        productFound: state.productReducer.productFound,
        token: state.userReducer.token
    }
}

const mapDispatchToProps = {

    modifyUser: userActions.modifyUser,
    productsList: productActions.getAllProducts,
    addToWishList: userActions.addToWishList,
	removeFromWishList: userActions.removeFromWishList
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)