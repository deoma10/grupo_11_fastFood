import '../../assets/css/ProductDetail.css'
import { useState, useEffect } from 'react';
import LoadPage from '../loadPage/loadPage';

function ProductDeatil(props) {
    const [isVisit, setIsVisit] = useState(false);

    useEffect(async() => {
        setTimeout(() => {
            setIsVisit(true);
        }, 2000)
    }, [])

    let view = isVisit ? (
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
    ) : (
        <LoadPage />
    )

    return (
        <div>
            {view}
        </div>
    )
}

export default ProductDeatil;