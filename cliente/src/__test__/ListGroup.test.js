import React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/extend-expect'; // Importa la función toBeInTheDocument
import ListGroup from '../components/listGroup';

describe('ListGroup Component', () => {
  it('renders the component with children', () => {
    // Crea una prueba de ejemplo con dos elementos de lista como hijos
    const children = [
      <li key="1">Item 1</li>,
      <li key="2">Item 2</li>
    ];

    render(<ListGroup>{children}</ListGroup>);

    // Verifica que el componente se renderice correctamente
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Verifica que los elementos de lista hijos se encuentren en el componente
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Puedes agregar más expectativas y aserciones según tus necesidades de prueba
  });
});
