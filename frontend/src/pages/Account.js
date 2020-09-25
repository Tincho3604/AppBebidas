import React, { useReducer, useState } from 'react';
import { connect } from "react-redux"

function Account() {

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
        <div style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
            <div>
                <div style={{ marginRight: "5vw" }}>
                    {editInfo.editInfo ?<input type="file" name="pic" onChange={handlData}></input> : <p>PHOTO</p>}
                </div>
                <div>
                    <h1>Tu perfil</h1>
                    <div>   {editInfo.editInfo ? <input type="text" name="name" placeholder="Nombre" onChange={handlData}></input> : <p>Nombre</p>}</div>
                    <div> {editInfo.editInfo ? <input type="text" name="lastname" placeholder="Apellido" onChange={handlData}></input> : <p>Apellido</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="phone" placeholder="Celular" onChange={handlData}></input> : <p>Telefono</p>}</div>
                    <div>  {editInfo.editInfo ? <button onClick={SendInfo} >Guardar informacion</button> : <button onClick={handleClick} >Editar perfil</button>}</div>
                    <div>  {editInfo.editInfo ? <button onClick={handleClick} >Cancelar</button> : <button onClick={handleClick} disabled>Cancelar</button>}

                    </div>

                </div>
            </div>
            <div>
                <div><h1>Direccion de Envio</h1>
                    <div>   {editInfo.editInfo ? <input type="text" name="street" placeholder="Calle" onChange={handlData}></input> : <p>Calle</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="numberStreet" placeholder="Numero de calle" onChange={handlData}></input> : <p>3</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="floor" placeholder="Piso" onChange={handlData}></input> : <p>2</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="apartament" placeholder="apartamento" onChange={handlData}></input> : <p>3</p>}</div>
                </div>
                <div><h1>Direccion de facturacion</h1>
                    <div>   {editInfo.editInfo ? <input type="text" name="streetFAC" placeholder="Calle" onChange={handlData}></input> : <p>Calle</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="numberStreetFAC" placeholder="Numero de calle" onChange={handlData}></input> : <p>3</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="floorFAC" placeholder="Piso" onChange={handlData}></input> : <p>2</p>}</div>
                    <div> {editInfo.editInfo ? <input type="number" name="apartamentFAC" placeholder="apartamento" onChange={handlData}></input> : <p>2</p>}</div>
                </div>
            </div>
        </div>
    </>
);
}
// const mapStateToProps = state => {
//     return {
//         userInfo: state.useReducer.urlPic,
//         userInfo: state.useReducer.firstName,
//         userInfo: state.useReducer.lastName,

//     }
// }

export default connect(null, null)(Account)