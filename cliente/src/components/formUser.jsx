import React, { useEffect, useState } from 'react';

export default function FormUser({ oldUser }) {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const [roles, setRoles] = useState(['admin', 'user']);

    useEffect(() => {
        setUser({ ...user, ...oldUser });
        console.log(user);
    }, [oldUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const saveUser = async () => {
        if (!user.name || !user.email || !user.password || !user.role) {
            console.log('Todos los campos son obligatorios');
            setMessage('Los campos están vacíos');
            return;
        }

        let URL = '';
        let params = {};
        if (user._id) {
            URL = 'https://tu-du.onrender.com/api/users/' + user._id;
            params = {
                method: 'PATCH',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            URL = 'https://tu-du.onrender.com/api/register';
            params = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }

        setMessage('');
        await fetch(URL, params);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        saveUser();
        setUser({
            name: '',
            email: '',
            password: '',
            role: '',
        });
    };
    
    return (
        <div className="card">
            <div className="card-header">Agregar usuario</div>
            <div className="card-body">
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Nombre"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Correo electrónico"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Contraseña"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="role">Rol:</label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccionar rol</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    {user._id ? (
                        <button type="submit" className="btn btn-outline-success btn-sm btn-block">
                            Actualizar
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-outline-success btn-sm btn-block">
                            Guardar
                        </button>
                    )}
                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
}
