import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';

const fakeExpenses = [
  {
    id: 1,
    title: 'Coffee',
    amount: 100,
  },
  {
    id: 2,
    title: 'Lunch',
    amount: 200,
  },
  {
    id: 3,
    title: 'Dinner',
    amount: 300,
  },
  {
    id: 4,
    title: 'Groceries',
    amount: 400,
  },
  {
    id: 5,
    title: 'Gas',
    amount: 500,
  },
  {
    id: 6,
    title: 'Coffee',
    amount: 100,
  },
  {
    id: 7,
    title: 'Lunch',
    amount: 200,
  },
  {
    id: 8,
    title: 'Dinner',
    amount: 300,
  },
  {
    id: 9,
    title: 'Groceries',
    amount: 400,
  },
  {
    id: 10,
    title: 'Gas',
    amount: 500,
  },
  {
    id: 11,
    title: 'Coffee',
    amount: 100,
  },
  {
    id: 12,
    title: 'Lunch',
    amount: 200,
  },
  {
    id: 13,
    title: 'Dinner',
    amount: 300,
  },
  {
    id: 14,
    title: 'Groceries',
    amount: 400,
  },
  {
    id: 15,
    title: 'Gas',
    amount: 500,
  },
  {
    id: 16,
    title: 'Coffee',
    amount: 100,
  },
  {
    id: 17,
    title: 'Lunch',
    amount: 200,
  },
  {
    id: 18,
    title: 'Dinner',
    amount: 300,
  },
  {
    id: 19,
    title: 'Groceries',
    amount: 400,
  },
  {
    id: 20,
    title: 'Gas',
    amount: 500,
  },
];

const createPostSchema = z.object({
  title: z.string(),
  amount: z.number(),
});

export const expensesRoute = new Hono()
  .get('/', c => {
    return c.json({ message: 'Hello from expenses!' });
  })
  .post('/', zValidator('json', createPostSchema), c => {
    const data = c.req.valid('json');
    console.log(data);
    return c.json({ message: 'Hello from expenses!' });
  })
  .get('/total-spent', c => {
    const total = fakeExpenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ total });
  })
  .get('/:id{[0-9]+}', c => {
    const id = parseInt(c.req.param('id'));
    const expense = fakeExpenses.find(e => e.id === Number(id));
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete('/:id{[0-9]+}', c => {
    const id = parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex(e => e.id === Number(id));
    if (index === -1) {
      return c.notFound();
    }
    fakeExpenses.splice(index, 1);
    return c.json({ message: 'Deleted!' });
  });
