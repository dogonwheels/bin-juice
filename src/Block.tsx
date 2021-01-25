import React, { Fragment, FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';
import './Block.css';
import BlockType from './BlockType';
import { formatHex } from './formatters';
import ViewProps from './ViewProps';

interface BlockProps extends ViewProps {
  type: BlockType;
  onUpdateLength: (start: number, length: number) => void;
  onUpdateType: (start: number, type: BlockType) => void;
  onMergeBlock: (start: number) => void;
  contentsComponent: FunctionComponent<ViewProps>;
}

function Block({
  data,
  start,
  length,
  cursor,
  type: currentType,
  onUpdateCursor,
  onUpdateLength,
  onUpdateType,
  onMergeBlock,
  contentsComponent,
}: BlockProps) {
  const isSelected = cursor >= start && cursor < start + length;

  const onLengthChange = useCallback(
    (e) => {
      const newLength = parseInt(e.target.value, 10);
      if (newLength) {
        onUpdateLength(start, newLength);
      }
    },
    [start, onUpdateLength],
  );

  const onTypeChange = useCallback(
    (e) => {
      const type = e.target.value;
      onUpdateType(start, type);
    },
    [onUpdateType, start],
  );

  const onBlockSelect = useCallback(() => {
    onUpdateCursor(start);
  }, [start, onUpdateCursor]);

  const onMergeClick = useCallback(() => {
    onMergeBlock(start);
  }, [start, onMergeBlock]);

  const types = Object.values(BlockType);
  const Component = contentsComponent;

  return (
    <div className={`Block${isSelected ? ' Selected' : ''}`} onClick={onBlockSelect}>
      <div className="BlockAddress">{formatHex(start, 16)}</div>
      <div className="BlockActions">
        <select value={currentType} onChange={onTypeChange}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {start ? <button onClick={onMergeClick}>Merge</button> : null}
      </div>
      <div className="BlockContents">
        <Component data={data} start={start} length={length} cursor={cursor} onUpdateCursor={onUpdateCursor} />
      </div>
      <div className="BlockOptions">
        <div className="BlockOptionsOverflow">
          {isSelected ? (
            <div className="BlockOptionList">
              <div>
                <input value={length} onChange={onLengthChange} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Block;
