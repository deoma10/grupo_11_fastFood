import image from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/LoadPage.css'

function LoadPage() {
    return (
        <div className="loading__page">
            <div className="loading">
                <img src={image} alt="Logo" />
            </div>
            <h3>Está casi listo...</h3>
        </div>
    )
}

export default LoadPage;
