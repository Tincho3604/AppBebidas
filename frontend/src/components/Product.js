import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import productActions from '../redux/actions/productActions';
import userActions from '../redux/actions/userActions';
import '../styles/product.css'

const Product = (props) => {
	return ( <>
		<div className="productCard">
			<div className="picture">
					<div className="info">	
						<Link to={`/product/${props.data._id}`}>
								<i className="fas fa-search"></i>
						</Link>
					</div>
				<img src={props.data.pic} alt="test" />
				<div className="like">	
					<i className="far fa-heart"></i>
				</div>
			</div>
			<div className="text">
				<div className="data">
					<span className="rating">
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star-half-alt"></i>
						<i className="far fa-star"></i>
					</span>
					<Link to={`/product/${props.data._id}`}><span className="title">{props.data.title}</span></Link>
					<Link to={`/product/${props.data._id}`}><span className="price">${props.data.price}</span></Link>
				</div>
				<div className="addToCartBtn" onClick={() => props.addToCart(props.data._id, 1)}>
					Agregar al pedido <i className="fas fa-cart-plus"></i>
				</div>
			</div>
		</div>
		</>
	 );
}
 
const mapStateToProps = state => {
    return{
	}
}
const mapDispatchToProps = {
	addToCart: userActions.addToCart
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(Product);