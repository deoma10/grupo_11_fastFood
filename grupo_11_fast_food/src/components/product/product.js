import '../../assets/css/Product.css'
import image from '../../assets/images/default-product.png'
import { Link } from 'react-router-dom';

function Product(props) {
    return (
        <div className="product">
            <div className='product__image'>
                <img src={image} alt="Product" />
            </div>
            <h4 className="product__title">
                Producto: {props.name}
            </h4>
            <p className='product__price'>
                $ {props.price}
            </p>
            <Link className='product__button' to="/test">
                Ver Detalle
            </Link>
        </div>
    )
}

export default Product;