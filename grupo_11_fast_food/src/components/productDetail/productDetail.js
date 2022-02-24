import image from '../../assets/images/default-product.png'
import '../../assets/css/ProductDetail.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

function ProductDeatil(props) {
    const [product, setProduct] = useState([]);
    const params = useParams();

    const callProduct = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/products`)
            const result = await res.json()
            const set = await result[1].filter((k) => {
                return k.idProducts == params.id
            })
            if (set[0] == undefined) {

            } else {
                return set[0]
            }

        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const newProduct = await callProduct()
        setProduct(newProduct)
    }, [])

    return (
        <div className="oneProduct">
            <h3 className="oneProduct__title">
                {product.name}
            </h3>
            <div className='oneProduct__image'>
                <img src={image} alt="Product" />
            </div>
            <p className="oneProduct__desc">
                {product.description}
            </p>            
            <p className='oneProduct__price'>
                $ {product.price}
            </p>
        </div>
    )
}

export default ProductDeatil;