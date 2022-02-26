import '../../assets/css/Product.css'
import { Link } from 'react-router-dom';


function  Product(props)  {
    let id = `/products/${props.id}`
    return (
        
        <div className="product">
                <div className='product__image'>
                    <img src={props.image} alt="Product" />
                </div>
                <h4 className="product__title">
                    Producto: {props.name}
                </h4>
                <p className='product__price'>
                    $ {props.price}
                </p>
                <Link className='product__button' to={id}>
                    Ver Detalle
                </Link>
        </div>
    )
}

export default Product;
