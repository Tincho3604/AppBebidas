import React from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../components/AdminHeader';
import DataAdmin from '../components/DataAdmin';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'

const AdminDashboard = (props) => {
	if(props.role !== 'admin') props.history.push('/')

	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<DataAdmin />		
	</div></> );
}
 
const mapStateToProps = state => {
    return {
		role: state.userReducer.role,
    }
}
  
export default connect(mapStateToProps)(AdminDashboard);