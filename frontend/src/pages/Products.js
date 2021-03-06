import React, { useEffect, useState } from 'react';
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


	const [productsFiltered, setProductsFiltered] = useState({
		products: []
	})


	function filtrarPrecio(min, max) {
		const productosFiltrados = props.products.filter(product => product.price >= min && product.price <= max)
		return productosFiltrados
	} const product0 = filtrarPrecio(150, 500)
	const product500 = filtrarPrecio(501, 1000)
	const product1000 = filtrarPrecio(1001, 2500)
	const product5000 = filtrarPrecio(2501, 5000)
console.log(productsFiltered)

	useEffect(() => {
		setProductsFiltered({
			products: props.products
		})

	}, [props.products])


	const HandlePrice = e => {
		if (e.target.id === "1") {
			setProductsFiltered({
				products: product0
			})
		} else if (e.target.id ==="2"){
			setProductsFiltered({
				products:product500
			})
		}else if (e.target.id ==="3"){
			setProductsFiltered({
				products:product1000
			})
		}else if (e.target.id ==="4"){
			setProductsFiltered({
				products:product5000
			})
		}else if (e.target.id ==="0"){
			setProductsFiltered({
				products: props.products
			})
		}
	}
	return (<>
		<Header />
		<div className='products'>
			<div className="navProducts">
				<div className="categories">

				</div>
				<div className="filters">
					<div style={{ display: "flex", flexDirection: "column", margin: "25px" }}>
						<p>Filtrar por Precio</p>
						<button style={{ marginBottom: "10px" }} onClick={HandlePrice} id="0">Todas las bebidas</button>
						<button style={{ marginBottom: "10px" }} onClick={HandlePrice} id="1">$150 - $500</button>
						<button style={{ marginBottom: "10px" }} onClick={HandlePrice} id="2">$501 - $1000</button>
						<button style={{ marginBottom: "10px" }} onClick={HandlePrice} id="3">$1001- $2500</button>
						<button style={{ marginBottom: "10px" }} onClick={HandlePrice} id="4">$2501-$5000</button>
					</div>

				</div>
			</div>
			<div className='productList'>
				{productsFiltered.products.length === 0 ? <p style={{color:"white"}}>No hay items</p>: productsFiltered.products.map(product => {
			return		<Product data= {product}/>
				})}
			</div>
		</div>
		<Footer />
	</>);
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