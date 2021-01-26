import React, { FunctionComponent, useCallback } from 'react';
import BitLength from './BitLength';
import { formatHex } from './formatters';
import Rows from './Rows';
import ViewProps from './ViewProps';

const PixelBlock: FunctionComponent<ViewProps> = (props) => {
  const formatter = useCallback((position, value) => {
    const style = {
      background: formatHex(value, 8, '#'),
      width: 6,
      height: 6,
    };
    return <div style={style} data-position={position} />;
  }, []);

  return <Rows className="Pixel" bitLength={BitLength.Dword} cellFormatter={formatter} {...props} />;
};

export default PixelBlock;
