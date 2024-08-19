import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login/index';
import Users from './pages/Users/index';

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        {
          auth.isAuthenticated && 
          <Route path="/users" element={<Users />} />
        }
        {console.log(auth)}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
