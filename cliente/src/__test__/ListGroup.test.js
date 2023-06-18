import React from 'react';
import { render, screen } from '@testing-library/react';
import ListGroup from '../components/ListGroup';
import '@testing-library/jest-dom';

describe('ListGroup Component', () => {
  it('should render the component with children', () => {
    const child1 = <li>Item 1</li>;
    const child2 = <li>Item 2</li>;

    render(
      <ListGroup>
        {child1}
        {child2}
      </ListGroup>
    );

    // Verificar que los elementos hijos estén presentes en la pantalla
    const child1Element = screen.getByText('Item 1');
    const child2Element = screen.getByText('Item 2');

    expect(child1Element).toBeInTheDocument();
    expect(child2Element).toBeInTheDocument();
  });

  // Resto de las pruebas...

});
