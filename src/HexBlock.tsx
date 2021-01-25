import React, { Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import './Block.css';
import BlockProps from './BlockProps';
import HexRow from './HexRow';

function HexBlock({ data, start, length, cursor, onUpdateCursor, onUpdateLength }: BlockProps) {
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

  const onLengthChange = useCallback((e) => {
    const newLength = parseInt(e.target.value, 10);
    if (newLength) {
      onUpdateLength(start, newLength);
    }
  }, []);

  const onBlockSelect = useCallback(() => {
    onUpdateCursor(start);
  }, []);

  return (
    <div className={`Block${isSelected ? ' Selected' : ''}`} onClick={onBlockSelect}>
      <div className="BlockType">Hex</div>
      <div className="BlockContents">{result}</div>
      <div className="BlockOptions">
        {isSelected ? (
          <Fragment>
            <input value={length} onChange={onLengthChange} />
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
