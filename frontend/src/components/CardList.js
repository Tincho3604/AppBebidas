import React, {useState, useEffect} from 'react';
import CardListItem from './CardListItem'
import AdminHeader from'./AdminHeader'
import NavAdmin from './NavAdmin'
import { connect } from 'react-redux';

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
		        <NavAdmin/>
				{props.cart.map(product => {
					return <CardListItem data = {product} />
				})} 
			</div>
        </>
    )
}



const mapStateToProps = state => {
    return{
        cart: state.userReducer.cart
	}
}
const mapDispatchToProps = {
  
}
  
export default connect(mapStateToProps,mapDispatchToProps)(CardList);


