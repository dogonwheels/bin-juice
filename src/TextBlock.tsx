import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import BlockProps from './BlockProps';
import round from './round';

const TextBlock: FunctionComponent<BlockProps> = ({ data, start, length }) => {
  const [buffer, setBuffer] = useState(new DataView(data));

  // DOMFIXME: hooks for 8, 16, 32?
  useEffect(() => {
    //const arrayLength = round(length - start, 2);
    setBuffer(new DataView(data, start, length));
  }, [data, start, length]);

  const result: ReactElement[] = [];
  for (let i = 0; i < length; i++) {
    result.push(<span key={i}> {String.fromCharCode(buffer.getUint8(i))}</span>);
  }
  return <div>{result}</div>;
};

export default TextBlock;
