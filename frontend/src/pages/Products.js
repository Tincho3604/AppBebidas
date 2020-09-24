import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavProducts from '../components/NavProducts';
import productActions from '../redux/actions/productActions';
import '../styles/products.css'

const Products = (props) => {
	useEffect(() => {
		const f = async () => {
			await props.getProducts(props.match.params.category)
		}
		f()
		console.log(props.products)
	}, [])
	return ( <>
	<Header />
	<div className='products'>
	<NavProducts />

	</div>
	<Footer />
	</> );
}
 
const mapStateToProps = state => {
    return {
		products: state.productReducer.products
    }
}

const mapDispatchToProps = {
	getProducts: productActions.getProductByCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);