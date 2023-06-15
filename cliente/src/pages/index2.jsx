import React, { useEffect, useState} from 'react'
import ListGroup from '../components/listGroup'
import Notas from '../components/Notas'
import { useParams } from 'react-router-dom';

export default function Index2({ name }) {
    const [notas, setNotas] = useState([]);
    const [oldNota, setOldNota] = useState({});
  
    const getNotas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notas');
        const result = await response.json();
  
        // Filtrar las notas por el ownerId igual a name
        const notasUsuario = result.filter((nota) => nota.ownerId === name);
  
        setNotas(notasUsuario);
      } catch (error) {
        console.log('Error al obtener las notas:', error);
      }
    };
  
    useEffect(() => {
      getNotas();
    }, []);
  
    const deleteNota = async (id) => {
      try {
        await fetch('http://localhost:5000/api/notas/' + id, {
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
        const nota = await fetch('http://localhost:5000/api/notas/' + id);
        const result = await nota.json();
        setOldNota(result);
      } catch (error) {
        console.log('Error al obtener la nota:', error);
      }
    };
  
    return (
      <div data-testid="index-component" className="content-app">
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
  
