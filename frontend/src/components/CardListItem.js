import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';

const  CardListItem = (props) => {

    const [valor, setValor] = useState (0)
    var [count, setCount] = useState(1)
    var[valuePrice, setPrice] = useState(0)

    useEffect ( async () => {
        const precio = await props.data.price
    setValor({
        valor:precio
    })
    setCount(count = props.data.quantity)
    setPrice(valuePrice = precio * count )
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
    <>
    <div className="conteiner">
        <h1>{props.data.title}</h1>
        
        <div className="photo" style={{backgroundImage: `url(${props.data.pic})`}}> 
    </div>  
        

    <div className="botones">
        <button onClick={removeProduct}>-</button>
        <p>{count - 1}</p>
        <button onClick={addProduct}>+</button>
        <p>X $ {props.data.price}={valuePrice}$</p> 
    </div>
    
   </div>
  
        </>
        )
    }
}


export default CardListItem


