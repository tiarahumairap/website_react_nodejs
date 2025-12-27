import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App