import burguer1 from '../../assets/images/burguer1.png'
import burguer2 from '../../assets/images/burguer2.png'
import burguer3 from '../../assets/images/burguer3.png'
import burguer4 from '../../assets/images/burguer4.png'
import burguer5 from '../../assets/images/burguer5.png'
import burguer6 from '../../assets/images/burguer6.png'
import burguer7 from '../../assets/images/burguer7.png'
import burguer8 from '../../assets/images/burguer8.png'
import burguer9 from '../../assets/images/burguer9.png'
import '../../assets/css/LoadPage.css'

function LoadPage() {
    let images = [burguer1, burguer2, burguer3, burguer4, burguer5, burguer6, burguer7, burguer8, burguer9];

    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    let rand = images[getRandomArbitrary(0, images.length - 1)]

    return (
        <div className="loading__page">
            <div className='container'>
            <img src={rand} alt="logito" />
            </div>
            <h3>Está casi listo...</h3>
        </div>
    )
}

export default LoadPage;
