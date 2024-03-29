import React, { useEffect, useState, useCallback } from 'react';

export default function Form({ oldNota, getNotas }) {
    const [message, setMessage] = useState('');
    const [nota, setNota] = useState({
        title: '',
        content: '',
        ownerId: '',
        ownerName: ''
    });
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('https://tu-du.onrender.com/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log('Error al obtener la lista de usuarios', error);
        }
    }, []);

    useEffect(() => {
        setNota((prevNota) => ({ ...prevNota, ...oldNota }));
    }, [oldNota]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
            console.log(nota)
            URL = 'https://tu-du.onrender.com/api/notas/' + nota._id;
            params = {
                method: 'PATCH',
                body: JSON.stringify(nota),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            URL = 'https://tu-du.onrender.com/api/notas/';
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
        getNotas();
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
                        <label htmlFor="title">Titulo:</label>
                        <input
                            data-testid="titulo-input"
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
