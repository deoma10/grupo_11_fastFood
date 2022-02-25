import ContentCenter from "../contentCenter/contentCenter";
import '../../assets/css/MainContent.css'

function MainContent() {
    return (
        <div className="content">
            <div className="content__title">
                <h2 className="title">
                    Dashboard
                </h2>
                <hr className="title__separator"/>
            </div>
            <ContentCenter />
        </div>
    )
}

export default MainContent;