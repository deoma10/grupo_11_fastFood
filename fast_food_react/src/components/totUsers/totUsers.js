import { useState, useEffect } from 'react';
import UsersPhoto from '../../assets/images/users.jpg'
import '../../assets/css/TotProducts.css'

function TotUsers() {
    const [total, setTotal] = useState([]);
    const [last, setLast] = useState([]);

    const callApi = async () => {
        try {
            const res = await fetch("http://fast-food-dh.herokuapp.com/api/users")
            const result = await res.json()
            return result[0]
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    const callUser = async () => {
        try {
            const res = await fetch(`http://fast-food-dh.herokuapp.com/api/users/last`)
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
                    <img src={UsersPhoto} alt="Product place"/>
                </div>
                <div className='product__message'>
                    <h4>Productos</h4>
                    <p>Nuestras hamburguesas son hechas con ingredientes frescos, pan artesanal libre de gluten</p>
                </div>
                <div className='product__info'>
                    <div className='product__info--total'>
                        <h4>{total.count}</h4>
                        <p>Total de usuarios</p>
                    </div>
                    <div className='product__info--last'>
                        <h4>{last.Name} {last.lastName}</h4>
                        <p>Ultimo usuario registrado</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotUsers;