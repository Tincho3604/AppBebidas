import React from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../components/AdminHeader';
import CreateProduct from '../components/CreateProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'

const AdminCreateProduct = (props) => {
	if(props.role !== 'admin') props.history.push('/')
	
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<CreateProduct />
	</div></> );
}

const mapStateToProps = state => {
    return {
		role: state.userReducer.role,
    }
}

export default connect(mapStateToProps)(AdminCreateProduct);