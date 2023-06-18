import React, { useEffect, useState } from 'react';

export default function Notas({ title, content, id, deleteNota, getNota, owner }) {
    const [ownerName, setOwnerName] = useState('');

    const fetchOwnerName = async () => {
        try {
            const response = await fetch(`https://tu-du.onrender.com/api/users/${owner}`);
            const data = await response.json();
            setOwnerName(data.name);
        } catch (error) {
            console.log('Error al obtener el nombre del propietario', error);
        }
    };
    useEffect(() => {
        fetchOwnerName();
    }, [owner,fetchOwnerName]);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start  mb-3">
          <style>
            {`               
                .row {
                    height: 100%
                    background-color:red
                }
                `}
          </style>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {content}
                <br></br>
                Encargado: {ownerName}
            </div>
            <div className="d-flex justify-content-between w-40">
                <button onClick={(e) => deleteNota(id)} className="btn btn-outline-danger btn-sm">
                    Rechazar
                </button>
            </div>
        </li>
    );
}