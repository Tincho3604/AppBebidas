import React, { useEffect } from 'react';
import NavProducts from '../components/NavProducts';

const Products = (props) => {
	useEffect(() => {
		// action que trae productos de una categoria
		// props.get
	}, [])
	return ( <>
	<NavProducts />
	<div className='products'>

	</div>
	</> );
}
 
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);