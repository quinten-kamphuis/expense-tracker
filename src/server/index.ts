import app from './app';

Bun.serve({
  fetch: app.fetch,
});

console.log('Bun server running on port 3000');
