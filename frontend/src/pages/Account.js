import React, { useReducer, useState } from 'react';
import { connect } from "react-redux"
import "../styles/account.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

function Account(props) {

    const [editInfo, setEditInfo] = useState({
        editInfo: false,

    })
    const [user, setUser] = useState({

    })
    const handleClick = e => {
        if (editInfo.editInfo === false) {
            setEditInfo({
                editInfo: true
            })
        } else {
            setEditInfo({
                editInfo: false
            })
        }

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
        console.log(user)
        const fd = new FormData()
        fd.append("name", user.name)
        fd.append("lastname", user.lastname)
        fd.append("phone", user.phone)
        fd.append("street", user.street)
        fd.append("numberStreet", user.numberStreet)
        fd.append("floor", user.floor)
        fd.append("apartament", user.apartament)
        fd.append("streetFAC", user.streetFAC)
        fd.append("numberStreetFAC", user.numberStreetFAC)
        fd.append("floorFAC", user.floorFAC)
        fd.append("apartamentFAC", user.apartamentFAC)
        fd.append("pic", user.pic)
        //ACCION

        // setError({
        //     ...error,
        //     ok: true
        // })
        setEditInfo({
            editInfo: false
        })
    }

console.log(user)
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
                        <div className="theInfo">  {editInfo.editInfo ? <input type="text" name="name" placeholder="Nombre" onChange={handlData}></input> : <p><span>Nombre: </span>{props.firstName}</p>}</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="lastname" placeholder="Apellido" onChange={handlData}></input> : <p><span>apellido:</span> {props.lastName}</p> }</div>
                        <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="phone" placeholder="Celular" onChange={handlData}></input> : <p><span>Telefono: </span>{props.firstName}</p>}</div>
                    </div>
                    <div className="buttonsInfo">
                        <div className="theInfo">  {editInfo.editInfo ? <button onClick={SendInfo} >Guardar informacion</button> : <button onClick={handleClick} >Editar perfil</button>}</div>
                        <div className="theInfo">  {editInfo.editInfo ? <button onClick={handleClick} className="cancelButton" >Cancelar</button> : <button onClick={handleClick} disabled className="cancelButton" >Cancelar</button>}</div>
                    </div>
                </div>
            </div>
            <div className="myBillingInfo">
                <div ><div  className='title'>Direccion de Envio</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="street" placeholder="Calle" onChange={handlData}></input> : <p>Calle:</p>}</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="numberStreet" placeholder="Numero de calle" onChange={handlData}></input> : <p>Nro.:</p>}</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="floor" placeholder="Piso" onChange={handlData}></input> : <p>Piso:</p>}</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="apartament" placeholder="apartamento" onChange={handlData}></input> : <p>Apartamento:</p>}</div>
                </div>
                <div><div  className='title'>Direccion de facturacion</div>
                    <div className="theInfo">   {editInfo.editInfo ? <input type="text" name="streetFAC" placeholder="Calle" onChange={handlData}></input> : <p>Calle:</p>}</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="numberStreetFAC" placeholder="Numero de calle" onChange={handlData}></input> : <p>Nro.:</p>}</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="floorFAC" placeholder="Piso" onChange={handlData}></input> : <p>Piso:</p>}</div>
                    <div className="theInfo"> {editInfo.editInfo ? <input type="number" name="apartamentFAC" placeholder="apartamento" onChange={handlData}></input> : <p>Apartamento:</p>}</div>
                </div>
                <div><div  className='title'>Productos que deseo</div>
                {/* aqui van los productos que quiero */}
                </div>
            </div>
        </div>
        <Footer/>
    </>
);
}
 const mapStateToProps = state => {
     return {
        urlPic: state.userReducer.urlPic,
        firstName: state.userReducer.firstName,
         lastName: state.userReducer.lastName,

     }
 }

export default connect(mapStateToProps, null)(Account)