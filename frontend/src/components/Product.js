import React from 'react';

const Product = (props) => {
	return ( <>
		<div className="productCard">
			<div className="picture">
				<img src={require('../images/ron-barcelo.png')} alt="test" />
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
					<span className="title">Ron Barceló</span>
					<span className="price">$2400</span>
				</div>
				<div className="addToCartBtn">
					Agregar al pedido <i className="fas fa-cart-plus"></i>
				</div>
			</div>
		</div>
		</>
	 );
}
 
export default Product;