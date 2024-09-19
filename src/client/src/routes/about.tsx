import { createFileRoute } from '@tanstack/react-router';

const About = () => {
  return (
    <main className="flex h-svh flex-col items-center justify-center">
      <img src="/vite.svg" alt="Expense Tracker" className="mb-4 h-32 w-32" />
      <p>
        This is a simple expense tracker application built with React, Vite, and
        TanStack.
      </p>
    </main>
  );
};

export const Route = createFileRoute('/about')({
  component: About,
});
