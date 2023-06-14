import React, { useEffect, useState } from 'react'
import ListGroup from '../components/listGroup'
import Notas from '../components/Notas'

export default function Index2() {

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
        <div className="row">
            <div className="col sm-12 col-md-8">
                <ListGroup>
                    {notas.map((nota, index) => (
                        <Notas key={index} deleteNota={deleteNota} getNota={getNota} id={nota._id} title={nota.title} content={nota.content}/>
                    ))}
                </ListGroup>
            </div>
        </div>
    </div>
  )
}
