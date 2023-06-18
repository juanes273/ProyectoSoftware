import { render, screen } from '@testing-library/react';
import Index from '../pages';
import '@testing-library/jest-dom'

describe('Notas', () => {
    it('should render the index component correctly', () => {
        const { getByTestId, getByText } = render(<Index />);
        
        expect(getByTestId('index-component')).toBeInTheDocument();
        expect(getByText('Tu-dú')).toBeInTheDocument();
      });


describe('Index Component', () => {
  it('should render the component', () => {
    render(<Index />);

    // Verificar que los elementos principales del componente estén presentes en la pantalla
    const titleElement = screen.getByText('Tu-dú');

    expect(titleElement).toBeInTheDocument();
  });
});
      
});