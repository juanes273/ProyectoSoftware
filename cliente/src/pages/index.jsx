import React, { useEffect, useState } from 'react'
import ListGroup from '../components/listGroup'
import Form from '../components/form'
import Notas from '../components/Notas'

export default function Index() {

    const [notas,setNotas] = useState([])
    const getNotas = async ()=>{
        const response = await fetch('http://localhost:3000/api/notas')
        const result = await response.json()
        setNotas(result)
    }
    useEffect(()=>{
        getNotas();
    })


  return (
    <div className="content-app">
        <div className="row">
            <div className="col sm-12 col-md-4">
                <Form/>
            </div>
            <div className="col sm-12 col-md-8">
                <ListGroup>
                    {notas.map((nota, index) => (
                        <Notas key={index} id={nota._id} title={nota.title} content={nota.content}/>
                    ))}
                </ListGroup>
            </div>
        </div>
    </div>
  )
}
