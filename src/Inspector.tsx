import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { formatBinary, formatHex } from './formatters';

interface InspectorProps {
  className: string;
  data: DataView;
  cursor: number;
  onSplitBlock: () => void;
}

const Inspector: FunctionComponent<InspectorProps> = ({ className, data, cursor, onSplitBlock }) => {
  const byte = data.getUint8(cursor);

  const word = cursor + 1 < data.byteLength ? data.getUint16(cursor) : byte;
  const dword = cursor + 3 < data.byteLength ? data.getUint32(cursor) : byte;

  const wordl = cursor + 1 < data.byteLength ? data.getUint16(cursor, true) : byte;
  const dwordl = cursor + 3 < data.byteLength ? data.getUint32(cursor, true) : byte;

  return (
    <div className={className}>
      <div className="InspectorTitle">{formatHex(cursor, 16)}</div>
      <button onClick={onSplitBlock}>Split</button>
      <div className="InspectorRow">
        <div className="InspectorHeader">Binary</div>
        <div>{formatBinary(byte, 8)}</div>
        <div className="InspectorType">Big-endian</div>
        <div>{formatBinary(word, 16)}</div>
        <div>{formatBinary(dword, 32)}</div>
        <div className="InspectorType">Little-endian</div>
        <div>{formatBinary(wordl, 16)}</div>
        <div>{formatBinary(dwordl, 32)}</div>
      </div>
      <div className="InspectorRow">
        <div className="InspectorHeader">Hex</div>
        <div>{formatHex(byte, 2)}</div>
        <div className="InspectorType">Big-endian</div>
        <div>{formatHex(word, 4)}</div>
        <div>{formatHex(dword, 8)}</div>
        <div className="InspectorType">Little-endian</div>
        <div>{formatHex(wordl, 4)}</div>
        <div>{formatHex(dwordl, 8)}</div>
      </div>
    </div>
  );
};

export default Inspector;
