import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Index from '../pages';
import Index2 from '../pages/index2';

function App() {
  const [role, setRole] = useState(null); // Estado para almacenar el rol del usuario
  const [name, setName] = useState(null); // Estado para almacenar el nombre de usuario

  useEffect(() => {
    // Comprobar si el rol y el nombre de usuario están almacenados en el almacenamiento local
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');
    if (storedRole && storedName) {
      setRole(storedRole);
      setName(storedName);
    }
  }, []);

  const handleLogin = async (email, password, navigate) => {
    try {
      const response = await axios.post('https://tu-du.onrender.com/api/login', {
        email,
        password,
      });
      const { role, name } = response.data;

      // Almacenar el rol y el nombre de usuario en el almacenamiento local
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      setRole(role);
      setName(name);

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
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        {role && <Route path="/form" element={<Index />} />}
        {role === 'admin' && <Route path="/admin-dashboard" element={<Index />} />}
        {role === 'user' && <Route path="/user-dashboard" element={<Index2 name={name} />} />}
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
        
      <style>
      {`
            body {
                font-family: Arial, sans-serif;
              }
            
              h1 {
                text-align: center;
                margin-bottom: 20px;
              }
            
              form {
                width: 300px;
                margin: 0 auto;
              }
            
              input {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
              }
            
              button {
                width: 100%;
                padding: 10px;
                background-color: #4caf50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              }
            
              button:hover {
                background-color: #45a049;
              }
            
              p {
                text-align: center;
                color: red;
                margin-top: 10px;
              }
            `}
      </style>
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
