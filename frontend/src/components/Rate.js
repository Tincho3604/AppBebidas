import React, { useState } from 'react';
import { connect } from 'react-redux';

const Rate = (props) => {
	const [rate, setRate] = useState({
		id: props.id,
		n: 1
	})

	const overHandler = e => {
		setRate({
			n: parseInt(e.target.id)
		})
	}
	return ( <>
	<i className="fas fa-star" id={1} onMouseEnter={overHandler}></i>
	<i className={rate.n >= 2 ? "fas fa-star" : "far fa-star"} id={2} onMouseEnter={overHandler}></i>
	<i className={rate.n >= 3 ? "fas fa-star" : "far fa-star"} id={3} onMouseEnter={overHandler}></i>
	<i className={rate.n >= 4 ? "fas fa-star" : "far fa-star"} id={4} onMouseEnter={overHandler}></i>
	<i className={rate.n >= 5 ? "fas fa-star" : "far fa-star"} id={5} onMouseEnter={overHandler}></i>
	<span>{rate.n}</span>
	</> );
}
 
const mapStateToProps = state => {
    return{
        id: state.userReducer.id
    }
  }

  const mapDispatchToProps = {

}
  
  export default connect(mapStateToProps,mapDispatchToProps)(Rate);