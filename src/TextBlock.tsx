import React, { FunctionComponent, useCallback } from 'react';
import BitLength from './BitLength';
import Rows from './Rows';
import ViewProps from './ViewProps';

const TextBlock: FunctionComponent<ViewProps> = (props) => {
  const columns = 32;
  const formatter = useCallback((value) => (value ? String.fromCharCode(value) : '.'), []);

  return (
    <Rows className="TextCell" columns={columns} bitLength={BitLength.Byte} cellFormatter={formatter} {...props} />
  );
};

export default TextBlock;
