import React, { FunctionComponent, ReactElement, useCallback } from 'react';
import BitLength from './BitLength';
import './Block.css';
import { formatHex } from './formatters';
import Rows from './Rows';
import ViewProps from './ViewProps';

const HexBlock: FunctionComponent<ViewProps> = (props) => {
  const columns = 16;
  const formatter = useCallback((value) => formatHex(value, 2, true), []);

  return <Rows columns={columns} bitLength={BitLength.Byte} cellFormatter={formatter} {...props} />;
};

export default HexBlock;
