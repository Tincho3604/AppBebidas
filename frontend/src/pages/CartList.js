import React, {useState, useEffect} from 'react';
import CartListItem from '../components/CartListItem'
import AdminHeader from'../components/AdminHeader'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/cartList.css"

const CardList = (props) => {	
	useEffect (() => {
		fetch('http://localhost:5000/categories').then(response => 
			response.json().then(data => {
				console.log("Data -->",data)
			}))
	},[])

return(<>
		<Header />
		<div className="Dashboard">
			{props.cart.map((product, index) => {
				return <CartListItem data={product} index={index} key={index} />
			})} 
			<NavLink to="/shippingAddress" style={{alignSelf: "end", maxWidth: 400}}><button className="btnPrimary" style={{minWidth: 200}}>Ir datos de envio</button></NavLink>
		</div>
		<Footer />
	</>
)}



const mapStateToProps = state => {
    return{
        cart: state.userReducer.cart
	}
}

  
export default connect(mapStateToProps,null)(CardList);


