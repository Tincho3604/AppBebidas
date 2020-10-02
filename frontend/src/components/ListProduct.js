import React, {useState} from 'react';
import ListCategory from './ListCategory'
import index, { CATEGORIES } from '../constants/index'

const ListProducts = () => {

    return (
        <>
        <div className="Container">
            
        {CATEGORIES.map(category => {
                return  <ListCategory key={category._id} category = {category.foto}/> 
        })}

            </div>
        
        
        
        </>
    )
}

export default ListProducts