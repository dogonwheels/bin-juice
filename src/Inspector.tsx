import React, { FunctionComponent, useCallback, useState } from 'react';
import { formatBinary, formatHex } from './formatters';
import './Inspector.css';

interface InspectorProps {
  className: string;
  data: DataView;
  cursor: number;
  onSplitBlock: () => void;
}

const Inspector: FunctionComponent<InspectorProps> = ({ className, data, cursor, onSplitBlock }) => {
  const [little, setLittle] = useState(false);

  const byte = data.getUint8(cursor);

  const toggleLittle = useCallback(() => {
    setLittle(!little);
  }, [little]);

  const word = cursor + 1 < data.byteLength ? data.getUint16(cursor, little) : byte;
  const dword = cursor + 3 < data.byteLength ? data.getUint32(cursor, little) : byte;

  return (
    <div className={className}>
      <div className="InspectorTitle">{formatHex(cursor, 16)}</div>
      <button onClick={onSplitBlock}>Split</button>
      <div>
        <input type="checkbox" checked={little} onChange={toggleLittle} />
        Little Endian
      </div>
      <div className="InspectorRow">
        <div className="InspectorHeader">Binary</div>
        <div>{formatBinary(byte, 8)}</div>
        <div>{formatBinary(word, 16)}</div>
        <div>{formatBinary(dword, 32)}</div>
      </div>
      <div className="InspectorRow">
        <div className="InspectorHeader">Hex</div>
        <div>{formatHex(byte, 2)}</div>
        <div>{formatHex(word, 4)}</div>
        <div>{formatHex(dword, 8)}</div>
      </div>
    </div>
  );
};

export default Inspector;
