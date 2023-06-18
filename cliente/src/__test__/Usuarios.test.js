import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import User from '../components/Usuarios';
import '@testing-library/jest-dom';

describe('User Component', () => {
  it('should render the component', () => {
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const id = 'user-id';

    render(
      <User name={name} email={email} id={id} deleteUser={() => {}} getUser={() => {}} />
    );

    // Verificar que los elementos principales del componente estén presentes en la pantalla
    const nameElement = screen.getByText(name);
    const emailElement = screen.getByText(email);
    const editButtonElement = screen.getByText('Editar');
    const deleteButtonElement = screen.getByText('Eliminar');

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(editButtonElement).toBeInTheDocument();
    expect(deleteButtonElement).toBeInTheDocument();
  });

  it('should call deleteUser function when delete button is clicked', () => {
    const deleteUserMock = jest.fn();
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const id = 'user-id';

    render(
      <User name={name} email={email} id={id} deleteUser={deleteUserMock} getUser={() => {}} />
    );

    const deleteButtonElement = screen.getByText('Eliminar');

    fireEvent.click(deleteButtonElement);

    expect(deleteUserMock).toHaveBeenCalledTimes(1);
    expect(deleteUserMock).toHaveBeenCalledWith(id);
  });

  it('should call getUser function when edit button is clicked', () => {
    const getUserMock = jest.fn();
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const id = 'user-id';

    render(
      <User name={name} email={email} id={id} deleteUser={() => {}} getUser={getUserMock} />
    );

    const editButtonElement = screen.getByText('Editar');

    fireEvent.click(editButtonElement);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    expect(getUserMock).toHaveBeenCalledWith(id);
  });

  // Resto de las pruebas...

});