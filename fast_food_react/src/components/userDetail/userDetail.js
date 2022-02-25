import '../../assets/css/UserDetail.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';


function UserDetail(props) {
    const [user, setUser] = useState([]);
    const params = useParams();

    const callUser = async () => {
        try {
            const res = await fetch(`http://fast-food-dh.herokuapp.com/api/users`)
            const result = await res.json()
            const set = await result[1].filter((k) => {
                return k.idUser == params.id
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
        const newUser = await callUser()
        setUser(newUser)
    }, [])

    return (
        <div className="oneUser">
            <div>
                <h3 className='oneUser__title'>
                    {user.Name} {user.lastName}
                </h3>
                <p>
                    Número de documento: {user.documentNumber}
                </p>
                <p>
                    Correo: {user.email}
                </p>
            </div>
            <div className="oneUser__image">
                <img src={user.imageName} alt="User" />
            </div>
        </div>
    )
}

export default UserDetail;