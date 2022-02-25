import '../../assets/css/UserDetail.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Error404 from '../error404/Error404';
import UserDetail from '../userDetail/userDetail';


function FindUser(props) {
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

    const result = user == undefined ? (
        <Error404 />
    ) : (
        <UserDetail name={user.Name} lastName={user.lastName} documentNumber={user.documentNumber} email={user.email} imageName={user.imageName} />
    )

    return (
        <div>
            {result}
        </div>
    )
}

export default FindUser;