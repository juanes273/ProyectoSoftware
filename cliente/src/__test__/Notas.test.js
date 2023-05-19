import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toBeInTheDocument } from '@testing-library/jest-dom/extend-expect'; // Importa la función toBeInTheDocument
import Notas from '../components/Notas'

describe('Notas Component', () => {
  test('renders Notas component with correct props', () => {
    const title = 'Test Title';
    const content = 'Test Content';
    const id = 1;
    
    render(<Notas title={title} content={content} id={id} />);
    
    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument();
  });
});
