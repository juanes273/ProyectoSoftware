import React, { useEffect, useState } from 'react'

export default function Form({oldNota}) {
    
    const [message, setMessage] = useState('');
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
        if (!nota.title || !nota.content) {
            console.log('Todos los campos son obligatorios')
            setMessage('Los campos están vacios')
            return
          }
        let URL =''
        let params= {}
        if(nota._id){
            URL = 'http://localhost:5000/api/notas/' + nota._id;
            params =  {
                method: 'PATCH',
                body: JSON.stringify(nota),
                headers:  {
                    'Content-Type':'application/json'
                }
            }
        }else{
            URL = 'http://localhost:5000/api/notas/'
            params =  {
                method: 'POST',
                body: JSON.stringify(nota),
                headers:  {
                    'Content-Type':'application/json'
                }
            }
        }
        setMessage()
        await fetch(URL,params)
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
    useEffect(()=>{
        setNota({...nota,...oldNota})
        console.log(nota)
    },[oldNota])
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
                {nota._id
                ?<button type='submit' className='btn btn-outline-success btn-sm btn-block'>Actualizar</button>
                :<button type='submit' className='btn btn-outline-success btn-sm btn-block'>Guardar</button>
                }
                <p>{message}</p>
                
            </form>
        </div>
    </div>
  )
}
