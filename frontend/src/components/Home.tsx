import { useState } from "react";
import { Button } from "./ui/button";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Prism Feeder</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        {count === 0 && (
          <Button className="mt-4">Click the counter to get started!</Button>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Welcome to your RSS feed reader</p>
    </>
  );
}

export default Home;
