import '../../assets/css/UserDetail.css'
import { useState, useEffect } from 'react';

function LastUsrInDb() {
    const [lastUser, setLastUser] = useState([]);

    const callUser = async () => {
        try {
            const res = await fetch(`http://fast-food-dh.herokuapp.com/api/users/last`)
            const result = await res.json()
            return result
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const newUser = await callUser()
        setLastUser(newUser)
    }, [])

    return (
        <div className="oneUser">
            <div>
                <h3 className='oneUser__title'>
                    {lastUser.Name} {lastUser.lastName}
                </h3>
                <p>
                    Número de documento: {lastUser.documentNumber}
                </p>
                <p>
                    Correo: {lastUser.email}
                </p>
            </div>
            <div className="oneUser__image">
                <img src={lastUser.imageName} alt="User" />
            </div>
        </div>
    )
}

export default LastUsrInDb;