import React from 'react'

export default function Notas({title,content,id}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{title}</div>
                    {content}
                </div>
                <div className="d-flex justify-content-between w-40">
                    <button className="btn btn-info btn-sm ">Aceptar</button>
                    <button className="btn btn-outline-danger btn-sm">Rechazar</button>
                </div>
            </li>
  )
}