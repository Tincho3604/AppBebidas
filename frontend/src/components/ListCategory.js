import React, {useState, useEffect} from 'react';
import productActions from '../redux/actions/productActions'
import {connect} from 'react-redux'
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const ListCategory = (props) => {
    
    const [listProduct, setList] = useState({
    })

    const card =  {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        width: '20%',
        textAlign:'center',
        color:'white',
        backgroundColor:'#323232',
        borderRadius:'5px',
    }
    const link = {
       display:'flex',
       fontSize:'10px',
       justifyContent:'space-between'
    }

    useEffect (async () => {
        const respuesta = await props.getListProduct(props.category)
    setList({
        ...listProduct,
        ...respuesta
        })
         
    },[])
   
   
    
      

    if(listProduct[0] === undefined){
        return <h1>Loading...</h1>
    }else{ 
        return(
        <>

        <div class="card" style={card}>
            <div class="container">
                <h4>{listProduct[0].title}</h4> 
                <p>${listProduct[0].price}</p> 

            
            <div style={link}>
            
            <Link to={`/editProduct/${listProduct[0]._id}`}>Edit</Link>
            
            {/* Este link iria removeProduct */}
            <Link  to="/">Remove</Link>
                
                </div>
            </div>
        </div>
        
        </> 
    
        )
    }
}

const mapStateToProps = state => {
    return {
		token: state.userReducer.token,
		
    }
}

const mapDispatchToProps = {
    getListProduct: productActions.getListProduct
}

export default connect(mapStateToProps,mapDispatchToProps)(ListCategory)
