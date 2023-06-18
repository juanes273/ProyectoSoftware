import React, { useEffect, useState } from 'react';
import ListGroup from '../components/listGroup';
import Form from '../components/form';
import Notas from '../components/Notas';
import FormUser from '../components/formUser';
import User from '../components/Usuarios';

export default function Index() {
    const [notas, setNotas] = useState([]);
    const [users, setUsers] = useState([]);
    const [oldNota, setOldNota] = useState({});
    const [oldUser, setOldUser] = useState({});

    const getNotas = async () => {
        const response = await fetch('https://tu-du.onrender.com/api/notas');
        const result = await response.json();
        setNotas(result);
    };

    const getUsers = async () => {
        const response = await fetch('https://tu-du.onrender.com/api/users');
        const result = await response.json();
        setUsers(result);
    };

    useEffect(() => {
        getNotas();
        getUsers();
      }, []);
    const deleteNota = async (id) => {
        await fetch('https://tu-du.onrender.com/api/notas/' + id, {
            method: 'DELETE',
            mode: 'cors'
        });
        getNotas();
    };

    const getNota = async (id) => {
        const nota = await fetch('https://tu-du.onrender.com/api/notas/' + id);
        const result = await nota.json();
        setOldNota(result);
    };

    const deleteUser = async (id) => {
        await fetch('https://tu-du.onrender.com/api/users/' + id, {
            method: 'DELETE',
            mode: 'cors'
        });
        getUsers();
    };

    const getUser = async (id) => {
        const user = await fetch('https://tu-du.onrender.com/api/users/' + id);
        const result = await user.json();
        setOldUser(result);
        
    };

    return (
        <div data-testid="index-component" className="content-app">
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                  }
                
                  h1 {
                    text-align: center;
                    background-color: #1A5276;
                    color: #ECF0F1;
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
            <center><h1>Tu-dú</h1></center>
            <div className="row">
                <div className="col sm-12 col-md-4">
                    <Form oldNota={oldNota} getNotas={getNotas} getNota={getNota}/>
                </div>
                <div name="notas" className="col sm-12 col-md-8">
                    <ListGroup>
                        {notas.map((nota, index) => (
                            <Notas key={index} deleteNota={deleteNota} getNota={getNota}  id={nota._id} title={nota.title} content={nota.content} owner={nota.ownerId} />
                        ))}
                    </ListGroup>
                </div>
                <div name="usuarios" className='col sm-12 col-md-4'>
                    <FormUser oldUser={oldUser}  getUsers={getUsers} />
                </div>
                <div className='col sm-12 col-md-8'>
                    <ListGroup>
                        {users.map((user, index) => (
                            <User key={index} deleteUser={deleteUser} getUsers={getUsers} getUser={getUser} id={user._id} name={user.name} email={user.email} />
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}
