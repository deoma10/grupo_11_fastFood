import '../../assets/css/ProductDetail.css'

function ProductDeatil(props) {
    return (
        <div className="oneProduct">
            <h3 className="oneProduct__title">
                {props.name}
            </h3>
            <div className='oneProduct__image'>
                <img src={props.imageName} alt="Product" />
            </div>
            <p className="oneProduct__desc">
                {props.description}
            </p>            
            <p className='oneProduct__price'>
                $ {props.price}
            </p>
        </div>
    )
}

export default ProductDeatil;