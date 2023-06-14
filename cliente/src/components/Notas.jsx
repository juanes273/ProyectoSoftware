import React from 'react'

export default function Notas({title,content,id,deleteNota,getNota}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start  mb-3">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{title}</div>
                    {content}
                </div>
                <div className="d-flex justify-content-between w-40">
                    <button onClick={(e)=>getNota(id)} className="btn btn-info btn-sm ">Aceptar</button>
                    <button onClick={(e)=>deleteNota(id)} className="btn btn-outline-danger btn-sm">Rechazar</button>
                </div>
            </li>
  )
}