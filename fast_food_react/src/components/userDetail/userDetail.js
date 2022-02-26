import '../../assets/css/UserDetail.css'

function UserDetail(props) {
    return (
        <div className="oneUser">
            <div>
                <h3 className='oneUser__title'>
                    {props.Name} {props.lastName}
                </h3>
                <p className="num_doc">
                    Número de documento: {props.documentNumber}
                </p>
                <p>
                    Correo: {props.email}
                </p>
            </div>
            <div className="oneUser__image">
                <img src={props.imageName} alt="User" />
            </div>
        </div>
    )
}

export default UserDetail;