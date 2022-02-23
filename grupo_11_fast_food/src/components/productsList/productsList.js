// import { useState, useEffect } from 'react';
import Product from '../product/product';
import '../../assets/css/ProductsList.css'

function ProductsList() {
    // const [listProducts, setListProducts] = useState([]);

    // const callApi = async() => {
    //     try {
    //         const res = await fetch("http://localhost:4000/api/products")
    //         const result = await res.json()
    //         return result
    //     } catch (error) {
    //         throw "Ocurrió un error con fetch"
    //     }
    // }

    // useEffect(async() => {
    //     const list = await callApi()
    //     setListProducts([...listProducts, ...list])
    // }, [])

    // const content = listProducts.length === 0 ? (
    //         <p>Cargando productos...</p>
    //     ) : (
    //         listProducts.map((product, index) => <Product key={index} name={product.name} price={product.price} />)
    //     )

    const testList = [{id: 1, name:"prueba1", price:"1200", imageName:"default-product.png"}, {id: 2, name:"prueba1", price:"1200", imageName:"default-product.png"}, {id: 3, name:"prueba1", price:"1200", imageName:"default-product.png"}, {id: 4, name:"prueba1", price:"1200", imageName:"default-product.png"}]

    const content = testList.map((product) => <Product id={product.id} name={product.name} price={product.price} imageName={product.imageName}/>)

    return (
        <div className='product__list'>
            {content}
        </div>
    )
}

export default ProductsList;