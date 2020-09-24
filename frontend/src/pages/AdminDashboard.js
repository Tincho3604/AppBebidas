import React from 'react';
import AdminHeader from '../components/AdminHeader';
import DataAdmin from '../components/DataAdmin';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'

const AdminDashboard = (props) => {
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<DataAdmin />		
	</div></> );
}
 
export default AdminDashboard;