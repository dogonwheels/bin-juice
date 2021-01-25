import React, { FunctionComponent, ReactElement } from 'react';
import ViewProps from './ViewProps';

const TextBlock: FunctionComponent<ViewProps> = ({ data, start, length, cursor, onUpdateCursor }) => {
  const result: ReactElement[] = [];
  for (let i = start; i < start + length; i++) {
    result.push(<span key={i}> {String.fromCharCode(data.getUint8(i))}</span>);
  }

  return <div>{result}</div>;
};

export default TextBlock;
