import React, { useEffect, useState } from 'react';

export default function Form({ oldNota }) {
    const [message, setMessage] = useState('');
    const [nota, setNota] = useState({
        title: '',
        content: '',
        ownerId: '',
        ownerName: ''
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setNota({ ...nota, ...oldNota });
        console.log(nota);
    }, [oldNota]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log('Error al obtener la lista de usuarios', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'owner') {
            const owner = users.find((user) => user.name === value);
            const ownerId = owner ? owner._id : '';
            console.log(ownerId);
            setNota({
                ...nota,
                ownerId,
                ownerName: value
            });
        } else {
            setNota({
                ...nota,
                [name]: value
            });
        }
    };

    const saveNota = async () => {
        if (!nota.title || !nota.content || !nota.ownerId) {
            console.log('Todos los campos son obligatorios');
            setMessage('Los campos están vacíos');
            return;
        }

        let URL = '';
        let params = {};
        if (nota._id) {
            URL = 'http://localhost:5000/api/notas/' + nota._id;
            params = {
                method: 'PATCH',
                body: JSON.stringify(nota),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            URL = 'http://localhost:5000/api/notas/';
            params = {
                method: 'POST',
                body: JSON.stringify(nota),
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
        saveNota();
        setNota({
            title: '',
            content: '',
            ownerId: '',
            ownerName: ''
        });
    };
    
    return (
        <div className="card">
            <div className="card-header">Agregar tarea</div>
            <div className="card-body">
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <input
                            name="title"
                            value={nota.title}
                            onChange={handleChange}
                            type="text"
                            placeholder="Titulo"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            name="content"
                            value={nota.content}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Contenido de la tarea"
                        ></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="owner">Dueño:</label>
                        <select
                            name="owner"
                            value={nota.ownerName}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccionar dueño</option>
                            {users.map((user, index) => (
                                <option key={index} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {nota._id ? (
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