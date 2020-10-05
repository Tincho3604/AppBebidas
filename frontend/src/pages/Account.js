import React, { useEffect, useReducer, useState } from 'react';
import { connect } from "react-redux"
import "../styles/account.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import userActions from '../redux/actions/userActions';
import productActions from '../redux/actions/productActions';
import ProductLike from "../components/productLike";

function Account(props) {

    const [editInfo, setEditInfo] = useState({
        editInfo: false,

    })
    const [user, setUser] = useState({

    })


    useEffect(() => {
        props.productsList()

    }, [])

console.log(user)

    const handleClick = e => {
        if (editInfo.editInfo === false) {
            setUser({
                ...user,
                firstName: props.firstName,
                lastName: props.lastName,
                nameFAC: props.billingAddress.nameFAC,
                street: props.shippingAddress.street,
                floor: props.shippingAddress.floor,
                streetHeight: props.shippingAddress.streetHeight,
                dniFAC: props.billingAddress.dniFAC,
                voucherFAC: props.billingAddress.voucherFAC,
                phone: props.shippingAddress.phone,
                phoneFAC: props.billingAddress.phoneFAC,
                notes: props.shippingAddress.notes,
                receiver: props.shippingAddress.receiver,
                notesFAC: props.billingAddress.notesFAC,

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
    console.log(user)

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
                            <div className="theInfo">  {editInfo.editInfo ? <input type="text" name="firstName" placeholder="Nombre" onChange={handlData} value={user.firstName} ></input> : <p><span>Nombre: </span>{props.firstName}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="lastName" placeholder="Apellido" onChange={handlData} value={user.lastName}></input> : <p><span>apellido:</span> {props.lastName}</p>}</div>
                        </div>
                        <div className="buttonsInfo">
                            <div className="theInfo">  {editInfo.editInfo ? <button onClick={SendInfo} >Guardar informacion</button> : <button onClick={handleClick} >Editar perfil</button>}</div>
                            <div className="theInfo">  {editInfo.editInfo ? <button onClick={handleClick} className="cancelButton" >Cancelar</button> : null}</div>
                        </div>
                    </div>
                </div>
                <div className="myBillingInfo">
                    <div ><div className='title'>Datos de Envio</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="street" placeholder="Calle" onChange={handlData} value={user.street}></input> : <p>Calle: {props.shippingAddress.street}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="streetHeight" placeholder="Altura" onChange={handlData} value={user.streetHeight}></input> : <p>Altura: {props.shippingAddress.streetHeight}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="floor" placeholder="Piso" onChange={handlData} value={user.floor}></input> : <p>Piso/Dpto: {props.shippingAddress.floor}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="receiver" placeholder="Quien recibe?" onChange={handlData} value={user.receiver}></input> : <p>Quien recibe?: {props.shippingAddress.receiver}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="phone" placeholder="Telefono" onChange={handlData} value={user.phone}></input> : <p>Telefono: {props.shippingAddress.phone}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="notes" placeholder="Notas" onChange={handlData} value={user.notes}></input> : <p>Notas: {props.shippingAddress.notes}</p>}</div>
                    </div>
                    <div><div className='title'>Datos de facturacion</div>
                        <div className="theInfo">   {editInfo.editInfo ? <input type="text" name="nameFAC" placeholder="Nombre y apellido / Nombre de fantasia" onChange={handlData} value={user.nameFAC}></input> : <p>Nombre y apellido / Nombre de fantasia: {props.billingAddress.nameFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="dniFAC" placeholder="CUIT/CUIL/DNI" onChange={handlData} value={user.dniFAC}></input> : <p>CUIT/CUIL/DNI: {props.billingAddress.dniFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="voucherFAC" placeholder="Tipo de comprobante" onChange={handlData} value={user.voucherFAC}></input> : <p>Tipo de comprobante: {props.billingAddress.voucherFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="phoneFAC" placeholder="Telefono" onChange={handlData} value={user.phoneFAC}></input> : <p>Telefono: {props.billingAddress.phoneFAC}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="notesFAC" placeholder="Notas" onChange={handlData} value={user.notesFAC}></input> : <p>Notas: {props.billingAddress.notesFAC}</p>}</div>
                    </div>
                    <div ><div className='title'>Productos que deseo</div>

                        {props.productFound.length === undefined ?

                            <p>No products available</p> :

                            props.productFound.map(product => {
                                if (props.wishlist.includes(product._id)) {

                                    return <>
                                        <p><ProductLike producto={product} />  </p>
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
    removeFromWishList: userActions.removeFromWishList,
    getInfo: userActions.getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)