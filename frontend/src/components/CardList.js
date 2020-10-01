import React, {useState, useEffect} from 'react';
import CardListItem from './CardListItem'
import AdminHeader from'./AdminHeader'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const CardList = (props) => {

	
	useEffect (() => {
		fetch('http://localhost:5000/categories').then(response => 
			response.json().then(data => {
				console.log("Data -->",data)
			}))
		},[])
	


return  (
<>
<AdminHeader />
	      
			<div className="dashboard">
				
				{props.cart.map(product => {
					return <CardListItem data = {product} />
				})} 
				<NavLink to="/shippingAddress"><button style={{height:'5vh', width:'10vh',margin:'0 auto'}}>Next</button></NavLink>
			</div>
		
		</>
    )
}



const mapStateToProps = state => {
    return{
        cart: state.userReducer.cart
	}
}

  
export default connect(mapStateToProps,null)(CardList);


