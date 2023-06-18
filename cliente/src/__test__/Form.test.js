import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from '../components/Form';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom'

describe('Form Component', () => {
  const mockUsers = [
    { _id: '1', name: 'User 1' },
    { _id: '2', name: 'User 2' },
    { _id: '3', name: 'User 3' }
  ];

  const mockGetNotas = jest.fn();

  it('should show error message when submitting form with empty fields', () => {
    const { getByText } = render(<Form oldNota={{}} getNotas={mockGetNotas} />);
    
    const saveButton = getByText('Guardar');
  
    fireEvent.click(saveButton);
  
    expect(getByText('Los campos están vacíos')).toBeInTheDocument();
    expect(mockGetNotas).not.toHaveBeenCalled();
  });
  
  it("Se debe mostrar el botón anterior Slide", async () => {
    const { getByText } = render(
        <Form oldNota={{}} getNotas={mockGetNotas} />
    );
    await waitFor(() => {
        const boton = getByText("Guardar");
        expect(boton).toBeInTheDocument();
    });
});
  
    
});
