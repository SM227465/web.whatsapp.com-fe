import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { user } = useSelector((state) => state.user);
  const [cookies] = useCookies(['accessToken']);

  return (
    <div className='dark'>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={cookies?.accessToken ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            exact
            path='/login'
            element={cookies?.accessToken ? <Navigate to='/' /> : <Login />}
          />
          <Route
            exact
            path='/register'
            element={cookies?.accessToken ? <Navigate to='/' /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
