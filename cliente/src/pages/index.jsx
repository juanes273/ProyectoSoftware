import React, { useEffect, useState } from 'react'
import ListGroup from '../components/listGroup'
import Form from '../components/form'
import Notas from '../components/Notas'

export default function Index() {

    const [notas,setNotas] = useState([])
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

  return (
    <div data-testid="index-component" className="content-app">
        <div className="row">
            <div className="col sm-12 col-md-4">
                <Form/>
            </div>
            <div className="col sm-12 col-md-8">
                <ListGroup>
                    {notas.map((nota, index) => (
                        <Notas key={index} deleteNota={deleteNota} id={nota._id} title={nota.title} content={nota.content}/>
                    ))}
                </ListGroup>
            </div>
        </div>
    </div>
  )
}
