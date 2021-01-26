import React, { FunctionComponent, ReactElement } from 'react';
import './Block.css';
import Row, { RowProps } from './Row';

interface RowsProps extends RowProps {
  className?: string;
}

const Rows: FunctionComponent<RowsProps> = ({ start, length, cursor, columns, ...props }) => {
  const rows: ReactElement[] = [];
  for (let row = 0; row < Math.ceil(length / columns); row++) {
    const rowStart = start + row * columns;
    const rowEnd = Math.min(start + length, rowStart + columns);
    const rowLength = rowEnd - rowStart;
    rows.push(<Row key={row} start={rowStart} length={rowLength} cursor={cursor} columns={columns} {...props} />);
  }

  return <div>{rows}</div>;
};

export default Rows;
