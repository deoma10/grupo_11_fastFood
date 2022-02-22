import { useState, useEffect } from 'react';
import Products from '../products/products';
import PropTypes from 'prop-types'

function ListProducts() {
    const [listProducts, setListProducts] = useState([]);

    const callApi = async () => {
        try {
            const dataProducts = await fetch('http://localhost:4000/api/products')
            const result = await dataProducts.json()
            return result
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(async () => {
        const productList = await callApi()
        setListProducts([...listProducts, ...productList])
    }, [])

    const content = listProducts.length == 0 ? (
        <p>Cargando Datos...</p>
    ) : (
        listProducts.map((product, index) => <Products key={index} name={product.name} price={product.price} />)
    )
    return (
        <div>
            {content}
        </div>
    )
}


export default ListProducts;
