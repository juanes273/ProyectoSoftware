import React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/extend-expect';
import Form from '../components/form'

describe('Form Component', () => {
  test('renders Form component without errors', () => {
    render(<Form />);
    
    // Verifica que el componente se haya renderizado sin errores
    expect(screen.getByText('Agregar nota')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Titulo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contenido de la tarea')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument();
  });
});
