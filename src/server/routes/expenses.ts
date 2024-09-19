import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';

const fakeExpenses = [
  {
    id: 1,
    title: 'Coffee',
    amount: 250,
  },
  {
    id: 2,
    title: 'Lunch',
    amount: 500,
  },
  {
    id: 3,
    title: 'Dinner',
    amount: 1200,
  },
];

const createPostSchema = z.object({
  title: z.string(),
  amount: z.number(),
});

export const expensesRoute = new Hono()
  .get('/', c => {
    return c.json({
      count: fakeExpenses.length,
      average: (
        fakeExpenses.reduce((acc, e) => acc + e.amount, 0) /
        fakeExpenses.length /
        100
      ).toFixed(2),
      total: (fakeExpenses.reduce((acc, e) => acc + e.amount, 0) / 100).toFixed(
        2
      ),
      expenses: fakeExpenses.map(e => ({
        ...e,
        amount: (e.amount / 100).toFixed(2),
      })),
    });
  })
  .post('/', zValidator('json', createPostSchema), c => {
    const data = c.req.valid('json');
    console.log(data);
    const id = fakeExpenses.length + 1;
    fakeExpenses.push({ id, ...data });
    return c.json({ message: 'Hello from expenses!' });
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
