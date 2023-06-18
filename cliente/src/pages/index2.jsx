import React, { useEffect, useState, useCallback } from 'react';
import ListGroup from '../components/listGroup';
import Notas from '../components/NotasUser';

export default function Index2({ name }) {
  const [notas, setNotas] = useState([]);
  const [oldNota, setOldNota] = useState({});

  const getNotas = useCallback(async () => {
    try {
      const response = await fetch('https://tu-du.onrender.com/api/notas');
      const result = await response.json();

      // Filtrar las notas por el ownerId igual a name
      const notasUsuario = result.filter((nota) => nota.ownerId === name);

      setNotas(notasUsuario);
    } catch (error) {
      console.log('Error al obtener las notas:', error);
    }
  }, [name]);

  useEffect(() => {
    getNotas();
  }, [getNotas]);

  const deleteNota = async (id) => {
    try {
      await fetch('https://tu-du.onrender.com/api/notas/' + id, {
        method: 'DELETE',
        mode: 'cors',
      });
      // Volver a obtener las notas después de eliminar
      getNotas();
    } catch (error) {
      console.log('Error al eliminar la nota:', error);
    }
  };

  const getNota = async (id) => {
    try {
      const response = await fetch('https://tu-du.onrender.com/api/notas/' + id);
      const result = await response.json();
      setOldNota(result);
    } catch (error) {
      console.log('Error al obtener la nota:', error);
    }
  };

  return (
    <div data-testid="index-component" className="content-app">
      <style>
        {`
          .content-app {
            background-color: #f2f2f2;
            padding: 20px;
          }

          .row {
            display: flex;
            justify-content: center;
          }

          .col {
            width: 100%;
            max-width: 800px;
          }
        `}
      </style>
      <center>
        <h1>Tu tu-dú dashboard</h1>
      </center>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col sm-12 col-md-8">
          <ListGroup>
            {notas.map((nota, index) => (
              <Notas
                key={index}
                deleteNota={deleteNota}
                getNota={getNota}
                id={nota._id}
                title={nota.title}
                content={nota.content}
                owner={nota.ownerId}
              />
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
