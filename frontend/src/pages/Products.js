import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavProducts from '../components/NavProducts';
import Product from '../components/Product';
import productActions from '../redux/actions/productActions';
import '../styles/products.css'

const Products = (props) => {
	useEffect(() => {
		const f = async () => {
			await props.getProducts(props.match.params.category)
		}
		f()

	}, [])


console.log(props)
const productsFiltered = props.products.filter(product => product.price > 500)
console.log(productsFiltered)

	return ( <>
	<Header />
	<div className='products'>
	<div className="navProducts">
			<div className="categories">

			</div>
			<div className="filters">
				<div style={{display:"flex", flexDirection:"column", margin:"25px"}}>
					<p>Filtrar por Precio</p>
					<button style={{marginBottom:"10px"}}>$500 - $1000</button>
					<button  style={{marginBottom:"10px"}}>$1001- $2500</button>
					<button  style={{marginBottom:"10px"}}>$2501-$5000</button>
				</div>

			</div>
		</div>
		<div className='productList'>
			{props.products.map(product => {
				return <Product data={product} />
			})}
		</div>
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