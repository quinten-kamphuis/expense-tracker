import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch('/api/expenses/total-spent')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTotalSpent(data.total);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </Button>
        <p>
          <strong>Total spent:</strong> ${totalSpent}
        </p>
        <p>Random number: {Math.floor(Math.random() * 100)}</p>
      </div>
    </>
  );
}

export default App;
