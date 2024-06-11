import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage.jsx';
import SignupPage from './features/auth/SignupPage.jsx';
// import MainPage from './pages/Main.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';

import './styles/styles.css';

const App = () => {
  // Transitioned to Redux Toolkit
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [initialGames, setInitialGames] = useState([]);
  // const [user, setUser] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        {/* <Route
          path='/home'
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path='/' element={<Navigate replace to='/signup' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
