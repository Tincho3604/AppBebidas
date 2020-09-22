import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import { ToastContainer } from 'react-toastify';
import './styles/generalStyles.css';
import 'react-toastify/dist/ReactToastify.css';

//Imports de pages
import Home from '../src/pages/Home';
import SignUp from '../src/pages/SignUp';
import Login from '../src/pages/Login';


function App(props) {
	if(localStorage.getItem('token') && props.user.token === '') {
		props.authUser(localStorage.getItem('token'))
	}
	const rutas = (props.user.token === '')
	? (<Switch>
		{/* RUTAS USUARIO DESLOGUEADO */}
		<Route exact path='/' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Login} />
		<Redirect to='/' />
	</Switch>)
	: (<Switch>
		{/* RUTAS USUARIO LOGUEADO */}
		<Route exact path="/" component={Home}/>
		<Redirect to='/' />
	</Switch>);
	

	return (
		<>
			<BrowserRouter>
				{rutas}	
			</BrowserRouter>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
  	);
}


const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

const mapDispatchToProps = {
	authUser: userActions.authUser
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
