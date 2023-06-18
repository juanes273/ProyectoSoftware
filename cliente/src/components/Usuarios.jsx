

export default function User({ name, email, id, deleteUser, getUser }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start mb-3">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>
                {email}
            </div>
            <div className="d-flex justify-content-between w-40">
                <button onClick={(e) => getUser(id)} className="btn btn-info btn-sm">
                    Editar
                </button>
                <button onClick={(e) => deleteUser(id)} className="btn btn-outline-danger btn-sm">
                    Eliminar
                </button>
            </div>
        </li>
    );
}
