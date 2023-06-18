// src/__mocks__/handlers.js

import { rest } from 'msw';

const handlers = [
  rest.get('https://tu-du.onrender.com/api/notas', (req, res, ctx) => {
    return res(
      ctx.json([
        // Aquí puedes definir tus notas simuladas
      ])
    );
  }),
  rest.get('https://tu-du.onrender.com/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        // Aquí puedes definir tus usuarios simulados
      ])
    );
  }),
];

export { handlers };
