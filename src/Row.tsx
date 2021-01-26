import React, { ReactElement, ReactNode, useCallback } from 'react';
import BitLength from './BitLength';
import ViewProps from './ViewProps';

const steps = {
  [BitLength.Byte]: 1,
  [BitLength.Word]: 2,
  [BitLength.Dword]: 4,
};

export interface RowProps extends ViewProps {
  className?: string;
  bitLength: BitLength;
  cellFormatter: (position: number, value: number) => ReactNode;
}

function Row({ data, start, length, cursor, bitLength, cellFormatter, className, onUpdateCursor }: RowProps) {
  const result: ReactElement[] = [];

  const onCellClick = useCallback(
    (e) => {
      const position = parseInt(e.target.dataset.position, 10);
      onUpdateCursor(position);
      e.stopPropagation();
    },
    [onUpdateCursor],
  );

  const step = steps[bitLength];

  const end = Math.min(start + length, data.byteLength - 4);
  for (let position = start; position < end; position += step) {
    const isSelected = cursor === position;
    let value = data.getUint8(position);
    if (bitLength === BitLength.Word) {
      value = data.getUint16(position);
    } else if (bitLength === BitLength.Dword) {
      value = data.getUint32(position);
    }

    result.push(
      <span
        onClick={onCellClick}
        className={`Cell${isSelected ? ' Selected' : ''}`}
        key={position}
        data-position={position}
      >
        {cellFormatter(position, value)}
      </span>,
    );
  }
  return <div className={`Row ${className ?? ''}`}>{result}</div>;
}

export default Row;
