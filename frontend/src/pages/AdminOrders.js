import React from 'react';
import AdminHeader from '../components/AdminHeader';
import EditProduct from '../components/EditProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'
import Orders from '../components/Orders'

const AdminOrders = (props) => {

	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<Orders />
	</div></> );
}
 
export default AdminOrders;