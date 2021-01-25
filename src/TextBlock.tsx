import React, { FunctionComponent, ReactElement } from 'react';
import BlockProps from './BlockProps';

const TextBlock: FunctionComponent<BlockProps> = ({ data, start, length }) => {
  const result: ReactElement[] = [];
  for (let i = 0; i < length; i++) {
    result.push(<span key={i}> {String.fromCharCode(data.getUint8(i))}</span>);
  }
  return <div>{result}</div>;
};

export default TextBlock;
