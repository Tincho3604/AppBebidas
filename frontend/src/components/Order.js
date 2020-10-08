import React, { useState } from 'react';
import { connect } from "react-redux"
import orderActions from '../redux/actions/orderActions';
import { toast } from 'react-toastify';

function Order(props) {

    const [abrir, setAbrir] = useState(false)
    const openDiv = () => {
        setAbrir(!abrir)
    }

    const sum = 0
    props.data.items.map(order => {
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
        return <></>
    } else {
        return (
            <>
                <div className="theTitleDiv">
                    <div onClick={openDiv} className="theTitlesList">
                        <h2>Orden número {props.data._id} Estado: {props.status}</h2>

                        {abrir ? <i class="fas fa-angle-up"></i> : <i class="fas fa-angle-down"></i>}
                    </div>
                    {abrir
                        ? (<>
						<div className="orderData">
							<div className="shippingData">
								<span>Datos de envio</span>
								<table>
									<tr>
										<td>Dirección:</td>
										<td>{props.data.shippingAddress.street} {props.data.shippingAddress.number} Dto: {props.data.shippingAddress.dpto}</td>
									</tr>
									<tr>
										<td>Quien recibe?:</td>
										<td>{props.data.shippingAddress.who}</td>
									</tr>
									<tr>
										<td>Telefono:</td>
										<td>{props.data.shippingAddress.phone}</td>
									</tr>
									<tr>
										<td>Notas:</td>
										<td>{props.data.shippingAddress.notes}</td>
									</tr>
								</table>
							</div>
							<div className="billingData">
								<span>Datos de facturación</span>
								<table>
									<tr>
										<td>Nombre:</td>
										<td>{props.data.billingAddress.name}</td>
									</tr>
									<tr>
										<td>CUIT:</td>
										<td>{props.data.billingAddress.cuit}</td>
									</tr>
									<tr>
										<td>Tipo de factura:</td>
										<td>{props.data.billingAddress.type}</td>
									</tr>
									<tr>
										<td>Telefono:</td>
										<td>{props.data.billingAddress.phone}</td>
									</tr>
									<tr>
										<td>Notas:</td>
										<td>{props.data.billingAddress.note}</td>
									</tr>
								</table>
							</div>
							<div className="itemsData">
								<table>
									{props.data.items.map(item => {
										return (<tr>
												<td>{item.quantity}</td>
												<td>{item.title}</td>
												</tr>)
									})}
									<tr>
										<td>TOTAL</td>
										<td></td>
									</tr>
								</table>
							</div>
						</div>
						</>)
                        : <></>}
                </div>

            </>

        )
    }
}
const mapDispatchToProps = {
    terminarOrden: orderActions.terminarOrden
}
export default connect(null, mapDispatchToProps)(Order)