import { useState, useEffect } from 'react';
import Product from '../product/product';
import '../../assets/css/ProductsList.css'

function ProductsList() {
    const [listProducts, setListProducts] = useState([]);
    
    const callApi = async() => {
        try {
            const res = await fetch("http://fast-food-dh.herokuapp.com/api/products")
            const result = await res.json()
            return result[1]
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const list = await callApi()
        setListProducts([...listProducts, ...list])
    }, [])

    const content = listProducts.length === 0 ? (
        <p>Cargando Productos...</p>
    ) : (
        listProducts.map((product, index) => <Product key={index} name={product.name} price={product.price} image={product.imageName} id={product.idProducts} />)
    )

    return (
        <div className= 'product__list'>
            {content}
        </div>
    )
}

export default ProductsList;