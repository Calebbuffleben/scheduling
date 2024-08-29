import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login/index';
import CompanyRegistrationPage from './pages/Registers/company-register';
import Users from './pages/Users/index';

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/company-register" element={<CompanyRegistrationPage />} />
        {
          auth.isAuthenticated && 
          <Route path="/users" element={<Users />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App;
