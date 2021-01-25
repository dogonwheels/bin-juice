import React, { FunctionComponent, ReactElement } from 'react';
import './Block.css';
import HexRow from './HexRow';
import ViewProps from './ViewProps';

const HexBlock: FunctionComponent<ViewProps> = ({ data, start, length, cursor, onUpdateCursor }) => {
  const columns = 16;

  const rows: ReactElement[] = [];
  for (let row = 0; row < Math.ceil(length / columns); row++) {
    const rowStart = start + row * columns;
    const rowEnd = Math.min(start + length, rowStart + columns);
    const rowLength = rowEnd - rowStart;
    rows.push(
      <HexRow
        key={row}
        data={data}
        start={rowStart}
        length={rowLength}
        cursor={cursor}
        onUpdateCursor={onUpdateCursor}
      />,
    );
  }

  return <div>{rows}</div>;
};

export default HexBlock;
