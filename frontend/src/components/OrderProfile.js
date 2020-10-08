import React, { useState } from 'react';
import { connect } from "react-redux"
import orderActions from '../redux/actions/orderActions';
import { toast } from 'react-toastify';


function OrderProfile(props) {

    const [abrir, setAbrir] = useState(false)
    const openDiv = () => {
        setAbrir(!abrir)
    }

    var data = props.orders
    var sum = 0
    data.map(order => {
        sum += order.price * order.quantity
    })
    const terminarOrden = async e => {

        await props.terminarOrden(e.target.id)
        setAbrir(!abrir)
        toast.success("¡Orden Eliminada!", {
            position: toast.POSITION.TOP_CENTER
        })
    }

    if (props.orders === undefined) {
        return <div className="theTitleDiv">
            <div className="theTitlesList">

                <i class="fas fa-angle-down"></i>
            </div>
        </div>
    } else {
        return (
            <>
                <div className="theTitleDiv">
                    <div onClick={openDiv} className="theTitlesList">
                        <h2>ORDEN DE {props.shippingAddress.who} {props.status}</h2>

                        {abrir ? <i class="fas fa-angle-up"></i> : <i class="fas fa-angle-down"></i>}
                    </div>
                    {abrir
                        ? (<>
                            <h1 style={{ color: "white" }}>Direccion de envio</h1>
                            {/* <button onClick={terminarOrden} id={props.id}>Terminar</button> */}
                            <div className="listCard">

                                <div className="listContainer">
                                    <div className="listSomeInfo">

                                        <p className="listTitle">Calle: {props.shippingAddress.street}</p>
                                        <p className="listTitle">Dpto: {props.shippingAddress.dpto}</p>
                                        <p className="listTitle">Telefonos: {props.shippingAddress.phone}</p>
                                        <p className="listTitle"> Notas: {props.shippingAddress.notes}</p>
                                    </div>
                                </div>
                            </div>
                            <h1 style={{ color: "white" }}>Direccion de facturacion</h1>
                            <div className="listCard">

                                <div className="listContainer">
                                    <div className="listSomeInfo">

                                        <p className="listTitle">Cuit: {props.billingAddress.cuit}</p>
                                        <p className="listTitle">Nombre: {props.billingAddress.name}</p>
                                        <p className="listTitle">Telefonos: {props.billingAddress.phone}</p>
                                        <p className="listTitle"> Notas: {props.billingAddress.notes}</p>
                                        <p className="listTitle"> Tipo de factura: {props.billingAddress.types}</p>
                                    </div>
                                </div>
                            </div>
                            <h2 style={{ color: "white" }}>Productos</h2>
                            {props.orders.map(product => {
                                return (<div className="listCard">
                                    <div className="listContainer">

                                        <div className="listSomeInfo">

                                            <p className="listTitle">{product.quantity} {product.title}</p>




                                        </div>
                                    </div>
                                    {/* <div className="listLink">
                                        <Link to={`/editProduct/${product._id}`} className="theLink">Edit</Link>

                                        <Link to="/" className="theLink2">Remove</Link>
                                    </div> */}
                                </div>)

                            })}
                            < div className="listCard" >

                                <div className="listContainer">
                                    <div className="listSomeInfo">

                                        <p className="listTitle">Total: {sum}</p>

                                    </div>
                                </div>
                            </div>
                          
                          
                        </>
                        )
                        : <></>}
                </div>

            </>

        )
    }
}
const mapDispatchToProps = {
    terminarOrden: orderActions.terminarOrden
}
export default connect(null, mapDispatchToProps)(OrderProfile)