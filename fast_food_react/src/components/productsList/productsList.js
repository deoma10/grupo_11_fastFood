import { useState, useEffect } from 'react';
import Product from '../product/product';
import LoadPage from '../loadPage/loadPage';
import '../../assets/css/ProductsList.css'

function ProductsList() {
    const [listProducts, setListProducts] = useState([]);
    const [isVisit, setIsVisit] = useState(false);

    const callApi = async () => {
        try {
            const res = await fetch("https://fast-food-dh.herokuapp.com/api/products")
            const result = await res.json()
            return result[1]
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async () => {
        const list = await callApi()
        setListProducts([...listProducts, ...list])
        setTimeout(() => {
            setIsVisit(true);
        }, 3000)
    }, [])

    let view = isVisit ? (
        listProducts.length === 0 ? (
            <LoadPage />
        ) : (
            listProducts.map((product, index) => <Product key={index} name={product.name} price={product.price} image={product.imageName} id={product.idProducts} />)
        )
    ) : (
        <LoadPage />
    )

    return (
        <div className='product__list'>
            {view}
        </div>
    )
}

export default ProductsList;