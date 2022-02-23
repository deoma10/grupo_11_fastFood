import '../assets/css/App.css';
import NavBar from './navBar/navBar'
import MainContent from './mainContent/mainContent';
import SideBar from ./sideBar/SideBar';

function App() {
  return (
    <div className='main'>
      <SideBar/>
      <NavBar />
      <MainContent />
    </div>
  );
}

export default App;
