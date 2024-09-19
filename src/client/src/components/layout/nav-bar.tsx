import { Link } from '@tanstack/react-router';

export const NavBar = () => {
  return (
    <header className="bg-background fixed left-0 top-0 flex w-full items-center justify-between border-b px-6 py-4">
      <h1 className="text-2xl">Expense Tracker</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/expenses" className="[&.active]:font-bold">
              Expenses
            </Link>
          </li>
          <li>
            <Link to="/create-expense" className="[&.active]:font-bold">
              Create Expense
            </Link>
          </li>
          <li>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
