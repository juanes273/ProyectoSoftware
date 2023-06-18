// notas.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Notas from '../components/Notas';
import '@testing-library/jest-dom'

describe('Notas', () => {
  test('renderiza el título correctamente', () => {
    const nota = {
      title: 'Título de la nota',
      content: 'Contenido de la nota',
      id: 1,
      owner: '12345',
      deleteNota: jest.fn(),
      getNota: jest.fn(),
    };

    const { getByText } = render(<Notas {...nota} />);

    const titulo = getByText('Título de la nota');
    expect(titulo).toBeInTheDocument();
  });

  test('llama a la función deleteNota al hacer clic en el botón de rechazar', () => {
    const nota = {
      title: 'Título de la nota',
      content: 'Contenido de la nota',
      id: 1,
      owner: '12345',
      deleteNota: jest.fn(),
      getNota: jest.fn(),
    };

    const { getByText } = render(<Notas {...nota} />);

    const botonRechazar = getByText('Rechazar');
    fireEvent.click(botonRechazar);

    expect(nota.deleteNota).toHaveBeenCalledWith(1);
  });

  test('llama a la función getNota al hacer clic en el botón de editar', async () => {
    const nota = {
      title: 'Título de la nota',
      content: 'Contenido de la nota',
      id: 1,
      owner: '12345',
      deleteNota: jest.fn(),
      getNota: jest.fn(),
    };

    const { getByText } = render(<Notas {...nota} />);

    const botonEditar = getByText('Editar');
    fireEvent.click(botonEditar);

    await waitFor(() => {
      expect(nota.getNota).toHaveBeenCalledWith(1);
    });
  });
});