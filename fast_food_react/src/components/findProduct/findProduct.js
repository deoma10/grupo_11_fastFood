import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Error404 from '../error404/Error404';
import ProductDeatil from '../productDetail/productDetail';

function FindProduct() {
    const [product, setProduct] = useState([]);
    const params = useParams();

    const callProduct = async () => {
        try {
            const res = await fetch(`https://fast-food-dh.herokuapp.com/api/products`)
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

    const result = product == undefined ? (
        <Error404 />
    ) : (
        <ProductDeatil name={product.name} description={product.description} price={product.price} imageName={product.imageName}/>
    )

    return (
        <div>
            {result}
        </div>
    )
}

export default FindProduct;