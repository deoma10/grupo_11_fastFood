import '../../assets/css/ProductDetail.css'
import { useState, useEffect } from 'react';
import LoadPage from '../loadPage/loadPage';

function LastProdInDb() {
    const [lastProduct, setLastProduct] = useState([]);
    const [isVisit, setIsVisit] = useState(false);

    const callProduct = async () => {
        try {
            const res = await fetch(`https://fast-food-dh.herokuapp.com/api/products/last`)
            const result = await res.json()
            return result
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const newProduct = await callProduct()
        setLastProduct(newProduct)
        setTimeout(() => {
            setIsVisit(true);
        }, 2000)
    }, [])

    let view = isVisit ? (
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
    ) : (
        <LoadPage />
    )

    return (
        <div>
            {view}
        </div>
    )
}

export default LastProdInDb;