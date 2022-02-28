import { useState, useEffect } from 'react';
import UserPhoto from '../../assets/images/users.jpg'
import '../../assets/css/TotProducts.css'

function TotUsers() {
    const [total, setTotal] = useState([]);
    const [last, setLast] = useState([]);

    const callApi = async () => {
        try {
            const res = await fetch("https://fast-food-dh.herokuapp.com/api/users")
            const result = await res.json()
            return result[0]
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    const callUser = async () => {
        try {
            const res = await fetch(`https://fast-food-dh.herokuapp.com/api/users/last`)
            const result = await res.json()
            return result
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async () => {
        const newTotal = await callApi()
        const newUser = await callUser()
        setTotal(newTotal)
        setLast(newUser)
    }, [])

    return (
        <div>
            <div className='product__card'>
                <div className='product__file'>
                    <img src={UserPhoto} alt="Product place" />
                </div>
                <div className='product__message'>
                    <h4>Usuarios</h4>
                    <p>Cada interacción que tenemos con un cliente influye. Buscamos ser grandiosos en cada momento</p>
                </div>
                <div className='product__info usr'>
                    <div className='product__info--total'>
                        <div className='total-products'>
                            <h4>{total.count}</h4>
                        </div>
                        <div className='total-products_desc'>
                            <p>Total de usuarios</p>
                        </div>
                    </div>
                    <div className='product__info--last'>
                        <div className='last-product'>
                            <h4>{last.Name} {last.lastName}</h4>
                        </div>
                        <div className='last-product_desc'>
                            <p>Ultimo usuario registrado</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotUsers;