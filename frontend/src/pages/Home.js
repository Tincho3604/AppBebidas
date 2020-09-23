import React, {useState} from 'react';
import {connect} from 'react-redux'
import "../styles/Home.css"
import alcohol from "../images/alcoholbanner.jpg"
import decoration from "../images/decoration.png"
import decoration2 from "../images/decoration2.png"
import Categories from '../components/Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';
const Home = (props) => {
        const categories = [
            {nombre: "Vino", foto: "vino"}, 
            {nombre: "Champagne", foto: "champagne"},
            {nombre: "Cerveza", foto: "cerveza"}, 
            {nombre: "Whisky y Espirituosas", foto: "whiskyespirituosas"},
            {nombre: "Sin Alcohol", foto: "sinalcohol"}, 
            {nombre: "Promociones", foto: "promociones"}]
    
    
    
    return (
        <>
           <Header />
            <div className="banner" style={{backgroundImage:`url(${alcohol})`}}>
        </div>
        <img src={decoration} className="homeBackgroundOne"/>
        <img src={decoration2} className="homeBackgroundTwo"/>
        <div className="whoWeAre">
            <h2>QUIENES SOMOS</h2>
            <p>Somos una empresa que distribuye alcohol de calidad, tenemos las bebidas alcoholicas mas exclusivas para que nuestros clientes disfruten. Buscamos brindar una experiencia y producto de primera calidad.</p>
            <h5>Si estas buscando bebidas exclusivas para disfrutar nuestro sitio es el correcto</h5>
        </div>
        <div className="categories">
            <h2>CATEGORIAS</h2>
            <div className="allCategories">
                {categories.map(conjunto => {
				  return (
					<div key={conjunto} >
                      <Categories categorie={conjunto}/>
                  	</div>
                  )
				})} 
            </div>
        </div>
        <form className="sign">
						<span className="title">INGRESAR</span>
						<div className="inputBox">
							<label htmlFor="mail"><i className="fas fa-envelope"></i></label>
							<input type="text" name="mail" id="mail" placeholder="Email" value="mail"/>
						</div>
						<div className="inputBox">
						</div>
						<button> send </button>
		</form>
        <Footer/>
        </>
    )

}


const mapStateToProps = state => {
    return{
  
    }
  }
  
  export default connect(mapStateToProps) (Home)
