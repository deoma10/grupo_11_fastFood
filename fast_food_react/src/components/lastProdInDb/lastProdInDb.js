import '../../assets/css/ProductDetail.css'
import { useState, useEffect } from 'react';

function LastProdInDb() {
    const [lastProduct, setLastProduct] = useState([]);

    const callProduct = async () => {
        try {
            const res = await fetch(`http://fast-food-dh.herokuapp.com/api/products/last`)
            const result = await res.json()
            return result
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const newProduct = await callProduct()
        setLastProduct(newProduct)
    }, [])

    return (
        <div className="oneProduct">
            <h3 className="oneProduct__title">
                {lastProduct.name}
            </h3>
            <div className='oneProduct__image'>
                <img src={lastProduct.imageName} alt="Product" />
            </div>
            <p className="oneProduct__desc">
                {lastProduct.description}
            </p>            
            <p className='oneProduct__price'>
                $ {lastProduct.price}
            </p>
        </div>
    )
}

export default LastProdInDb;