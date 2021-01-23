import React, { useEffect, useState } from 'react';
import './App.css';
import TextBlock from './TextBlock';

function App() {
  const [data, setData] = useState(new ArrayBuffer(10));

  useEffect(() => {
    const array = new ArrayBuffer(1000);
    setData(array);
    async function createFile() {
      let response = await fetch('FLAG_B24.BMP');
      let data = await response.blob();
      let array = await data.arrayBuffer();
      setData(array);
    }
    createFile();
  }, []);

  return (
    <div className="App">
      <h1>Hello, World</h1>
      {data.byteLength > 14 ? <TextBlock data={data} start={0} length={14} /> : <h2>Burp</h2>}
    </div>
  );
}

export default App;
