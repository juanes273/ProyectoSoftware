import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the app without errors', () => {
    render(<App />);

    // Verifica que el componente se renderice sin errores
  });
});
