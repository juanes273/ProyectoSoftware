import React from 'react'

export default function Form() {
  return (
    <div className="card">
        <div className="card-header">
            Agregar nota
        </div>
        <div className="caard-body">
            <form action="">
                <div className="form-group mb-3">
                    <input name='title' type="text" placeholder='Titulo' className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <textarea name='content' className='form-control' placeholder='Contenido de la tarea'></textarea>
                </div>
                <button type='submit' className='btn btn-outline-success btn-sm btn-block'>Guardar</button>
            </form>
        </div>
    </div>
  )
}
