import '../assets/css/App.css';
import SideBar from './sideBar/sideBar';
import MainContent from './mainContent/mainContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons'


function App() {
  return (
    <div className='main'>
     <div className='contenedor-main'>
        <SideBar />
        <MainContent />
     </div >
    </div>
  );
}

export default App;
