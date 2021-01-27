import React, { FunctionComponent, useCallback } from 'react';
import BitLength from './BitLength';
import { formatHex } from './formatters';
import Rows from './Rows';
import ViewProps from './ViewProps';

const Pixel16Block: FunctionComponent<ViewProps> = (props) => {
  const formatter = useCallback((position, value) => {
    const grayscale = (value / 4) % 256;
    const style = {
      background: `rgb(${grayscale}, ${grayscale}, ${grayscale})`,
      width: 6,
      height: 6,
    };
    return <div style={style} data-position={position} />;
  }, []);

  return <Rows className="Pixel" bitLength={BitLength.Word} cellFormatter={formatter} {...props} />;
};

export default Pixel16Block;
