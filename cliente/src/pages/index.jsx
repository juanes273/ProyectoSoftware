import React, { useEffect, useState } from 'react'
import ListGroup from '../components/listGroup'
import Form from '../components/form'
import Notas from '../components/Notas'

export default function Index() {

    const [notas,setNotas] = useState([])
    const [oldNota,setOldNota] = useState({})
    const getNotas = async ()=>{
        const response = await fetch('http://localhost:5000/api/notas')
        const result = await response.json()
        setNotas(result)
    }
    useEffect(()=>{
        getNotas();
    },[notas])

    const deleteNota = async(id)=>{
        // console.log(id)
        await fetch('http://localhost:5000/api/notas/'+id,{
            method:'DELETE',
            mode:'cors'
        })
    }
    const getNota = async(id) => {
        const nota =  await fetch('http://localhost:5000/api/notas/'+id)
        const result = await nota.json()
        setOldNota(result)
        
    }

  return (
    <div data-testid="index-component" className="content-app">
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
        <center><h1>Tu-dú dashboard</h1></center>
        <div className="row">
            <div className="col sm-12 col-md-4">
                <Form oldNota={oldNota}/>
            </div>
            <div name="notas" className="col sm-12 col-md-8">
                <ListGroup>
                    {notas.map((nota, index) => (
                        <Notas key={index} deleteNota={deleteNota} getNota={getNota} id={nota._id} title={nota.title} content={nota.content} owner={nota.ownerId}/>
                    ))}
                </ListGroup>
            </div>
        </div>
    </div>
  )
}
