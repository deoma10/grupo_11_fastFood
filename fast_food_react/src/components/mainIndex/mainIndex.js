import '../../assets/css/mainIndex.css'
import TotProducts from '../totProducts/totProducts'
import TotUsers from '../totUsers/totUsers'

function MainIndex() {
    return (
        <div className="mainIndex-api">
            <div className='infoCards'>
                <TotProducts />
                <TotUsers />
            </div>
            <div className="video">
                <iframe src="https://www.youtube.com/embed/V5w1OGknhlc?autoplay=1&mute=1&loop=0&controls=0&showinfo=0&rel=0&modestbranding=0&disablekb=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}

export default MainIndex