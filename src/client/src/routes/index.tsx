import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

const Index = () => {
  const [count, setCount] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['total-spent'],
    queryFn: async () => {
      const data = await api.expenses['total-spent'].$get();
      return await data.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </Button>
        <p>
          <strong>Total spent:</strong> ${data?.total}
        </p>
        <p>Random number: {Math.floor(Math.random() * 100)}</p>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
