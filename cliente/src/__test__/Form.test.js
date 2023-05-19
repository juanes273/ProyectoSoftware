import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../components/form'

test('renders the form component', () => {
  const { getByText, getByPlaceholderText } = render(<Form />);

  expect(getByText('Agregar nota')).toBeInTheDocument();
  expect(getByPlaceholderText('Titulo')).toBeInTheDocument();
  expect(getByPlaceholderText('Contenido de la tarea')).toBeInTheDocument();
  expect(getByText('Guardar')).toBeInTheDocument();
});

test('calls submit handler on form submission', () => {
  const handleSubmit = jest.fn();
  const { getByText } = render(<Form onSubmit={handleSubmit} />);

  fireEvent.click(getByText('Guardar'));

  expect(handleSubmit).toHaveBeenCalled();
});
