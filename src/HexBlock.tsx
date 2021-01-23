import React, { ReactElement, useEffect, useState } from 'react';

interface HexBlockProps {
  data: ArrayBuffer;
  start: number;
  length: number;
}

function HexBlock({ data, start, length }: HexBlockProps) {
  const [buffer, setBuffer] = useState(new DataView(data));

  useEffect(() => {
    setBuffer(new DataView(data, start, length));
  }, [data, start, length]);

  const result: ReactElement[] = [];
  for (let i = 0; i < length; i++) {
    result.push(<span key={i}> {buffer.getUint8(i).toString(16).padStart(2, '0')}</span>);
  }
  return <div>{result}</div>;
}

export default HexBlock;
