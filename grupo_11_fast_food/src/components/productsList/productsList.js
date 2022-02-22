import { useState, useEffect } from 'react';
import Product from '../product/product';

function ProductsList() {
    const [listProducts, setListProducts] = useState([]);

    const callApi = async() => {
        try {
            const res = await fetch("http://localhost:4000/api/products")
            const result = await res.json()
            return result
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const list = await callApi()
        setListProducts([...listProducts, ...list])
    }, [])

    const content = listProducts.length === 0 ? (
            <p>Cargando productos...</p>
        ) : (
            listProducts.map((product, index) => <Product key={index} name={product.name} />)
        )
    return (
        <div>
            {content}
        </div>
    )
}

export default ProductsList;