import React, { useState } from 'react'

export default function Form() {
    const [nota,setNota]= useState({
        title: '',
        content: ''
    })

    const handleChange = (e) => {
        let newNota = {
            [e.target.name] :  e.target.value,
            [e.target.name] :  e.target.value
        }
        setNota({...nota,...newNota})
    }
    const saveNota =  async () =>{
        await fetch('http://localhost:5000/api/notas',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(nota),
            headers:  {
                'Content-Type':'application/json'
            }
        })
    }
    const obSubmit = (e) => {
        // console.log(e)
        e.preventDefault();
        saveNota()
        setNota({
            'title': '',
            content : ''
        })
    }
  return (
    <div className="card">
        <div className="card-header">
            Agregar nota
        </div>
        <div className="caard-body">
            <form action="" onSubmit={obSubmit}>
                <div className="form-group mb-3">
                    <input name='title' value={nota.title} onChange={handleChange} type="text" placeholder='Titulo' className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <textarea name='content' value={nota.content} onChange={handleChange} className='form-control' placeholder='Contenido de la tarea'></textarea>
                </div>
                <button type='submit' className='btn btn-outline-success btn-sm btn-block'>Guardar</button>
            </form>
        </div>
    </div>
  )
}
