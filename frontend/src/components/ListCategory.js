import React, {useState, useEffect} from 'react';
import productActions from '../redux/actions/productActions'
import {connect} from 'react-redux'
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "../styles/listCategory.css"

const ListCategory = (props) => {
    const [abrir, setAbrir] = useState(false)
    const [listProduct, setList] = useState({
    })

    

    useEffect ( () => {
        const f = async() => {
        const respuesta = await props.getListProduct(props.category)
    setList({
        ...listProduct,
        ...respuesta
        })
    }
    f()   
    },[])
   
    const openDiv =() =>{
        setAbrir(!abrir)
    }
    
      

    if(listProduct[0] === undefined){
        return <div className="theTitleDiv">
                    <div className="theTitlesList">
                        <h2>{props.category}</h2>
                        <i class="fas fa-angle-down"></i>
                    </div>
                </div>
    }else{ 
        return(
        <>
        <div className="theTitleDiv">
            <div onClick={openDiv} className="theTitlesList">
                <h2>{props.category}</h2>
                {abrir ? <i class="fas fa-angle-up"></i> :<i class="fas fa-angle-down"></i> }
            </div>
            {abrir 
            ? <div className="listCard">
                <div className="listContainer">
                    <img src={listProduct[0].pic} className="listImage"></img>
                    <div className="listSomeInfo">
                        <h4 className="listTitle">{listProduct[0].title}</h4> 
                        <p className="listStock">{listProduct[0].stock} unidades</p>
                        <p className="listPrice">$ {listProduct[0].price}</p> 
                    </div>
                </div>
                <div className="listLink">
                    <Link to={`/editProduct/${listProduct[0]._id}`} className="theLink">Edit</Link>
                    {/* Este link iria removeProduct */}
                    <Link  to="/" className="theLink2">Remove</Link>  
                </div>
            </div>
            : <></>}
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
