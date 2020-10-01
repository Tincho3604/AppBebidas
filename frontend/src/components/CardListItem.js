import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import "../styles/cardList.css"
const  CardListItem = (props) => {

    const [valor, setValor] = useState (0)
    var [count, setCount] = useState("")
    var[valuePrice, setPrice] = useState(0)

    useEffect ( () => {
        const fx = async() =>{
        const precio = await props.data.price
    setValor({
        valor:precio
    })
    setCount(count = props.data.quantity)
    setPrice(valuePrice = precio * count )
    }
    fx()
    },[])

  

    const addProduct = async () => {
        setCount(count + 1)
        setPrice(valuePrice = count * valor.valor)
    }
    
    const removeProduct = () => {
    
        if(count - 1 <= 0){
            toast("Error: El pedido no pueden tener numeros negativos")
        
        }else{
            setCount(count - 1)
            setPrice(valuePrice = valuePrice - valor.valor)
        }
    }

    if(valor.valor === undefined){
        return <h1>Loading</h1>
    }else{
    return (
    <div className="TheConteiner">
        <div className="cardCard">
            <div className="cardContainer"> 
                <div className="Photo" style={{backgroundImage: `url(${props.data.pic})`}}> </div>
            </div>  
            <div className="botones">
                <h1>{props.data.title}</h1>
                <div className="theButtons">
                    <button onClick={removeProduct} className="plus">-</button>
                    <p>{count}</p>
                    <button onClick={addProduct} className="plus">+</button>
                    <p><span>x</span> $ {props.data.price} <span>=</span> {valuePrice}$</p> 
                </div>
            </div> 
        </div>
   </div>
    
        )
    }
}


export default CardListItem


