import '../assets/css/App.css';
import SideBar from './sideBar/sideBar';
import NavBar from './navBar/navBar';
import MainContent from './mainContent/mainContent';

function App() {
  return (
    <div className='main'>
      <SideBar />
      <NavBar />
      <MainContent />
    </div>
  );
}

export default App;
