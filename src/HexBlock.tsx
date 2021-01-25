import React, { Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import './Block.css';
import BlockProps from './BlockProps';
import BlockType from './BlockType';
import { formatHex } from './formatters';
import HexRow from './HexRow';

function HexBlock({ data, start, length, cursor, onUpdateCursor, onUpdateLength, onMergeBlock }: BlockProps) {
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
   */

  const onLengthChange = useCallback(
    (e) => {
      const newLength = parseInt(e.target.value, 10);
      if (newLength) {
        onUpdateLength(start, newLength);
      }
    },
    [start, onUpdateLength],
  );

  const onBlockSelect = useCallback(() => {
    onUpdateCursor(start);
  }, [start, onUpdateCursor]);

  const onMergeClick = useCallback(() => {
    onMergeBlock(start);
  }, [start, onMergeBlock]);

  const currentType = BlockType.Hex;
  const types = Object.values(BlockType);

  return (
    <div className={`Block${isSelected ? ' Selected' : ''}`} onClick={onBlockSelect}>
      <div className="BlockAddress">{formatHex(start, 16)}</div>
      <div className="BlockContents">{result}</div>
      <div className="BlockOptions">
        <div>
          <select>
            {types.map((type) => (
              <option selected={type === currentType}>{type}</option>
            ))}
          </select>
          {start ? <button onClick={onMergeClick}>Merge</button> : null}
        </div>
        {isSelected ? (
          <Fragment>
            <input value={length} onChange={onLengthChange} />
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default HexBlock;
