import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/productFull.css"
import vino from "../images/botella.png"
import Comment from '../components/Comment';
import userActions from "../redux/actions/userActions"
import { toast } from "react-toastify"
import productActions from '../redux/actions/productActions';
import { CATEGORIES } from '../constants';
import decoration2 from "../images/decoration3.png"

const ProductFull = (props) => {
    const [product, setproduct] = useState({
       product: 1
    })
    const[update, setUpdate]=useState(false)

    const [comment, setComment] = useState({
		comment: "",
        name: "",
		productId: "",
	})
    useEffect(() => {
		const gR = async () => {
			await props.dataProduct(props.match.params.id)
			await props.getComments(props.match.params.id)
		}
		gR()
		setUpdate(false)
	}, [update])

	const readComment = e => {
		const text = e.target.value
		const comment = e.target.name
		setComment({
			...comment,
			[comment]: text,
            name:`${props.firstName} ${props.lastName}`,
			productId: props.product._id,
		})
	}
	const sendComment = async e => {
        e.preventDefault()
        setUpdate(true)
		if (props.token) {
            if (comment.comment === '' ) {
                toast("por favor escriba un comentario")
            }else{
            props.newComment(comment)
			setComment({
				...comment,
			    comment: "",
			})
			toast.success("Su comentario fue publicado.")
            }

		} else {
			toast.error("Es necesaria una cuenta para publicar un comentario")
        }
    
       
    }
    const restar = async e => {
        e.preventDefault()
        if (product.product > 1){
            setproduct({
                product: product.product - 1
            })

        }
    }
    const sumar = async e => {
        e.preventDefault()
            setproduct({
                product: product.product + 1
            })

    }

    return(
        <>
		{console.log(props.product)}
        <Header/>
        <div >
        <img src={decoration2} className="homeBackgroundTwoo"/>
            <div className="Classbanner">
                <img src={vino}/>
                <p>{CATEGORIES.map(cat => {
					return cat.foto === props.product.category && cat.nombre
				})}</p>
            </div>
            <div className="infoProduct">
                <div className="allInformation">
                    <img src={props.product.pic}/>
                    <div>
                    <h2>{props.product.title}</h2>
                        <p className="units">{props.product.stock} unidades</p>
                        <p className="price">$ {props.product.price}</p>
                        <p className="description">{props.product.description}</p>
                        <div className="quantity">
                            <button onClick={restar} className="plus"> -</button>
                            <p>{product.product}</p>
                            <button onClick={sumar} className="plus">+</button>
                            <button className="addToBag">agregar al carrito</button>
                        </div>
                        <div className="aditionalInfo">
                        <p>{props.product.ml} ml</p>
                        <p>{props.product.alcPct}% alc</p>
                        </div>
                        <div className="ratings">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <i class="far fa-star"></i>
                        </div>
                    </div>
                </div>
                <div className="theComments">
                <h2>Comentarios</h2>
			        <div className="scrollComments">
                        {props.comments === null || props.comments === undefined
                        ? "cargando..."
                        : props.comments.map((comentario, index) => {
                            return <Comment key={index} fx={setUpdate} data={comentario} />
                        })}
			        </div>
                    <div className="TheInput">
						<input disabled={props.token ? false : true} onChange={readComment} className="TextComment" placeholder={props.token ? "Escribe tu comentario..." : "ingresa para comentar..."} name="comment" value={comment.comment}/>
						<button className="buttonSend" onClick={sendComment}><i className="fas fa-paper-plane"></i></button>
				    </div>
                </div>    
            </div>
        </div>
        <Footer />
        </>
    )
}



const mapStateToProps = state => {
    return{
        product: state.productReducer.productFound, 
        firstName: state.userReducer.firstName,
        lastName: state.userReducer.lastName,
        comments: state.userReducer.comments,
        token: state.userReducer.token,
    }
  }
const mapDispatchToProps = {
    dataProduct: productActions.dataProduct,
    newComment: userActions.newComment,
	getComments: userActions.getComments,
}
  
  export default connect(mapStateToProps,mapDispatchToProps) (ProductFull)

