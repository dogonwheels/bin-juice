import React, { ReactElement, useEffect, useState } from 'react';
import round from './round';

interface TextBlockProps {
  data: ArrayBuffer;
  start: number;
  length: number;
}

function TextBlock({ data, start, length }: TextBlockProps) {
  const [buffer, setBuffer] = useState(new DataView(data));

  // DOMFIXME: hooks for 8, 16, 32?
  useEffect(() => {
    const arrayLength = round(length - start, 2);
    setBuffer(new DataView(data, start, arrayLength));
  }, [data, start, length]);

  const result: ReactElement[] = [];
  console.log('render ', start, length);
  for (let i = 0; i < Math.floor(length / 2); i++) {
    result.push(<span key={i}> {buffer.getUint16(start + i * 2, true).toString(16)}</span>);
  }
  return <div>{result}</div>;
}

export default TextBlock;
