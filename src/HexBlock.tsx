import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import './Block.css';
import BlockProps from './BlockProps';
import HexRow from './HexRow';

function HexBlock({ data, start, length, cursor, onUpdateCursor }: BlockProps) {
  const columns = 16;
  const isSelected = cursor >= start && cursor < start + length;

  const result: ReactElement[] = [];
  for (let row = 0; row < Math.ceil(length / columns); row++) {
    const rowStart = start + row * columns;
    const rowEnd = Math.min(start + length, rowStart + columns);
    const rowLength = rowEnd - rowStart;
    result.push(
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

  /* <Block type=Hex options=[...] start length cursor >result</Block>
  check isSelected
  click fallthrough to set to 0
  render dropdown for block type
  delete block
  change size
  */

  return (
    <div className={`Block${isSelected ? ' Selected' : ''}`}>
      <div className="BlockType">Hex</div>
      <div className="BlockContents">{result}</div>
      <div className="BlockOptions">
        {isSelected ? (
          <Fragment>
            <div>Foo</div>
            <div>Foo</div>
            <div>Foo</div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default HexBlock;
