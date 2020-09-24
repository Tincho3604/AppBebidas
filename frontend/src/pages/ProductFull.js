import React, {useState} from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header';
import Footer from '../components/Footer';
import alcohol from "../images/alcohol.jpg"
import "../styles/productFull.css"
import vino from "../images/botella.png"


const ProductFull = (props) => {



    return(
        <>
        <Header/>
        <div >
            <div className="Classbanner">
                <img src={vino}/>
                <p>vinos</p>
            </div>
            <div className="infoProduct">
                <div className="allInformation">
                    <img src={alcohol}/>
                    <div>
                    <h2>Luis Cañas Crianza 2016</h2>
                        <p className="units">20 unidades</p>
                        <p className="price">10,41 €</p>
                        <p className="description">Luis Cañas Crianza 2016, elaborado con tempranillo y algo de garnacha, es, sin duda, un vino de extraordinaria relación calidad/precio.
                           En el año 1970 Luis Cañas funda la Bodega que lleva su nombre, siendo su objetivo elaborar los mejores vinos cosecheros. En 1989 pasa a manos de su hijo Juan Luis, que prima la elaboración de vinos de crianza de calidad.</p>
                        <div className="quantity">
                            <button className="plus"> -</button>
                            <p>0</p>
                            <button className="plus">+</button>
                            <button className="addToBag">agregar al carrito</button>
                        </div>
                        <div className="aditionalInfo">
                        <p>750 ml</p>
                        <p>6,5% alc</p>
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
            </div>
        </div>
        <Footer />
        </>
    )
}



const mapStateToProps = state => {
    return{
  
    }
  }
  
  export default connect(mapStateToProps) (ProductFull)

