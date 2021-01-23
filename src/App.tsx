import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(new ArrayBuffer(10));

  useEffect(() => {
    const array = new ArrayBuffer(1000);
    setData(array);
    //setView()
  }, []);

  return (
    <div className="App">
      <h1>Hello, World</h1>
    </div>
  );
}

export default App;
