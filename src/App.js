import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        const res = await api.get('/user/me');
        setUser(res.data.user);
      }
    } catch (err) {
      console.err(err);
      setUser(null);
    }
  };
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage setUser={setUser} user={user} />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <Layout user={user} setUser={setUser}>
              <TodoPage user={user} />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
