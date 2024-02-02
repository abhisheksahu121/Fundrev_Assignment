import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Pagenotfound from './pages/Pagenotfound';
import InvestorRegister from './pages/Auth/InvestorRegister';
import StartupRegister from './pages/Auth/StartupRegister';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Investor from './pages/Investor';
import Startup from './pages/Startup';

function App() {
  return (
    <div>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/investorregister' element={<InvestorRegister/>}/>
    <Route path='/startupregister' element={<StartupRegister/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/investor' element={<Investor/>}/>
    <Route path='/startup' element={<Startup/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
    </div>
  );
}

export default App;

