import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <Layout>
            <TodoPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
