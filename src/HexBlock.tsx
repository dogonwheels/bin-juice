import React, { FunctionComponent, useCallback } from 'react';
import BitLength from './BitLength';
import { formatHex } from './formatters';
import Rows from './Rows';
import ViewProps from './ViewProps';
import './Block.css';

const HexBlock: FunctionComponent<ViewProps> = (props) => {
  const formatter = useCallback((position, value) => formatHex(value, 2, ''), []);

  return <Rows bitLength={BitLength.Byte} cellFormatter={formatter} {...props} />;
};

export default HexBlock;
