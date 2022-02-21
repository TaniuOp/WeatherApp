import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.scss';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

function App() {
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <Main />
        </AlertProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
