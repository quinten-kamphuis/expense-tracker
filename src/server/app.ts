import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use('*', logger());

// app.get('*', c => {
//   return c.json({ message: 'Hello via Hono!', route: c.req.url });
// });

app.get('/', c => {
  return c.json({ message: 'Hello via Hono!' });
});

app.basePath('/api').route('/expenses', expensesRoute);

export default app;
