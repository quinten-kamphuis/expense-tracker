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

const Index = () => {
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
          <CardTitle>Overview</CardTitle>
          <CardDescription>A summary of your expenses</CardDescription>
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
              <li>
                <p>
                  <strong>Number of expenses:</strong> {data?.count}
                </p>
              </li>
              <li>
                <p>
                  <strong>Average cost:</strong> ${data?.average}
                </p>
              </li>
              <li>
                <p>
                  <strong>Total spent:</strong> ${data?.total}
                </p>
              </li>
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
