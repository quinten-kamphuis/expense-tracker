import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { api } from '@/lib/api';

const Expenses = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const data = await api.expenses.$get();
      return await data.json();
    },
  });

  return (
    <main className="flex h-svh flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>All of your expenses in one place</CardDescription>
        </CardHeader>
        <CardContent>
          {
            // If the data is loading, show a loading message
            isLoading && <p>Loading...</p>
          }
          {
            // If there was an error, show an error message
            isError && (
              <p>
                Error:{' '}
                {error?.message || 'An error occurred while fetching data'}
              </p>
            )
          }
          {!isLoading && !isError && (
            <ul>
              {data?.expenses.map(expense => (
                <li key={expense.id}>
                  <p>
                    <strong>{expense.title}</strong> - ${expense.amount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute('/expenses')({
  component: Expenses,
});
