import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage.jsx';
import SignupPage from './features/auth/SignupPage.jsx';
import GroupPage from './features/group/GroupPage.jsx';
import IdeasPage from './features/ideas/IdeasPage.jsx';
// import NewIdeaPage from './features/ideas/NewIdeaPage.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';

// import MainPage from './pages/Main.jsx';

import './styles/styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='/group'
          element={
            <ProtectedRoute>
              <GroupPage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path='/ideas'
          element={
            <ProtectedRoute>
              <IdeasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/new'
          element={
            <ProtectedRoute>
              <NewIdeaPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
