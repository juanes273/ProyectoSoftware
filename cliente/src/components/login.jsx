import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Index from '../pages';
import Index2 from '../pages/index2';

function App() {
  const [role, setRole] = useState(null); // Estado para almacenar el rol del usuario

  useEffect(() => {
    // Comprobar si el rol del usuario está almacenado en el almacenamiento local
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogin = async (email, password, navigate) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { role } = response.data;

      // Almacenar el rol del usuario en el almacenamiento local
      localStorage.setItem('role', role);
      setRole(role);

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'user') {
        navigate('/user-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      console.log(error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        {role && (
          <Route path="/form" element={<Index />} />
        )}
        {role === 'admin' && (
          <Route path="/admin-dashboard" element={<Index />} />
        )}
        {role === 'user' && (
          <Route path="/user-dashboard" element={<Index2 />} />
        )}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password, navigate);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

function Dashboard() {
  return <h1>General Dashboard</h1>;
}

export default App;
