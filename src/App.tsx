import React, { FunctionComponent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Block from './Block';
import BlockType from './BlockType';
import HexBlock from './HexBlock';
import PixelBlock from './PixelBlock';
import Pixel16Block from './Pixel16Block';
import TextBlock from './TextBlock';
import Inspector from './Inspector';
import DropArea from './DropArea';
import Layout from './Layout';
import layoutsForType from './layoutsForType';
import ViewProps from './ViewProps';
import './App.css';

const componentsForType: { [blockType: string]: FunctionComponent<ViewProps> } = {
  [BlockType.Hex]: HexBlock,
  [BlockType.Text]: TextBlock,
  [BlockType.Pixel]: PixelBlock,
  [BlockType.Pixel16]: Pixel16Block,
};

interface BlockDefinition {
  type: BlockType;
  length: number;
}

interface BlockLayout {
  type: BlockType;
  start: number;
  end: number;
  length: number;
  top: number;
  height: number;
  layout: Layout;
}

function App() {
  const [data, setData] = useState<DataView>();
  const [blocks, setBlocks] = useState<BlockDefinition[]>([]);
  const [cursor, setCursor] = useState(0);

  const scroller = useRef<HTMLDivElement>(null);
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(0);

  useEffect(() => {
    async function createFile() {
      let response = await fetch('CT-MONO2-16-brain.dcm');
      let data = await response.blob();
      let array = await data.arrayBuffer();
      setData(new DataView(array));
    }
    createFile();
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    const blockSize = 1024;
    const blocks = [];
    for (let position = 0; position < data.byteLength; position += blockSize) {
      const length = Math.min(blockSize, data.byteLength - position);
      blocks.push({ type: BlockType.Hex, length });
    }
    setBlocks(blocks);
  }, [data]);

  // Cache more detail about the layout
  const blockLayout = useMemo(() => {
    const result: BlockLayout[] = [];
    let position = 0;
    let top = 0;

    if (data) {
      blocks.forEach(({ type, length }) => {
        const start = position;
        const end = Math.min(position + length, data.byteLength);

        const layout = new layoutsForType[type](length);
        const height = layout.getHeight();

        // Only add the block if it covers data
        if (start < data.byteLength) {
          result.push({
            type,
            start,
            end,
            length: end - start,
            top,
            height,
            layout,
          });
        }

        position += length;
        top += height;
      });
    }

    return result;
  }, [blocks, data]);

  const scrollerStyle = useMemo(() => {
    const lastBlock = blockLayout[blockLayout.length - 1];

    return {
      height: lastBlock ? lastBlock.top + lastBlock.height : 0,
    };
  }, [blockLayout]);

  const onUpdateScroll = useCallback(() => {
    const visibleStart = scroller.current?.scrollTop ?? 0;
    const visibleHeight = scroller.current?.offsetHeight ?? 0;
    setVisibleStart(visibleStart);
    setVisibleEnd(visibleStart + visibleHeight);
  }, []);

  useLayoutEffect(() => {
    if (data) {
      onUpdateScroll();
    }
  }, [data, onUpdateScroll]);

  const onUpdateType = useCallback(
    (start, type) => {
      const index = blockLayout.findIndex((block) => block.start === start);
      if (index === -1) {
        return;
      }

      const newBlocks = blocks.slice();
      newBlocks[index].type = type;

      setBlocks(newBlocks);
    },
    [blocks, blockLayout],
  );

  const onUpdateLength = useCallback(
    (start, length) => {
      const index = blockLayout.findIndex((block) => block.start === start);
      if (index === -1) {
        return;
      }

      const newBlocks = blocks.slice();
      newBlocks[index].length = length;

      setBlocks(newBlocks);
    },
    [blocks, blockLayout],
  );

  const onMergeBlock = useCallback(
    (start) => {
      const index = blockLayout.findIndex((block) => block.start === start);

      // Can't delete the first block
      if (index < 1) {
        return;
      }

      // Remove the block and add its length to the previous one
      const newBlocks = blocks.slice();
      newBlocks.splice(index, 1);
      newBlocks[index - 1].length += blocks[index].length;

      setBlocks(newBlocks);
    },
    [blocks, blockLayout],
  );

  const onSplitBlock = useCallback(() => {
    const index = blockLayout.findIndex((block) => cursor >= block.start && cursor < block.end);
    if (index === -1) {
      return;
    }

    // Can't split at the first cell
    const oldLayoutBlock = blockLayout[index];
    if (cursor === oldLayoutBlock.start) {
      return;
    }

    const newBlocks = blocks.slice();
    const partition = cursor - oldLayoutBlock.start;

    newBlocks[index].length = partition;
    const newBlock = {
      ...blocks[index],
      length: oldLayoutBlock.length - partition,
    };

    newBlocks.splice(index + 1, 0, newBlock);

    setBlocks(newBlocks);
  }, [blocks, blockLayout, cursor]);

  return data ? (
    <div className="App">
      <div className="Blocks" onScroll={onUpdateScroll} ref={scroller}>
        <div className="Scroller" style={scrollerStyle}>
          {blockLayout.map(({ type, start, length, top, height, layout }) => (
            <Block
              key={start}
              type={type}
              data={data}
              start={start}
              length={length}
              visibleStart={visibleStart}
              visibleEnd={visibleEnd}
              top={top}
              height={height}
              columns={layout.columns}
              cursor={cursor}
              contentsComponent={componentsForType[type]}
              onUpdateCursor={setCursor}
              onUpdateLength={onUpdateLength}
              onUpdateType={onUpdateType}
              onMergeBlock={onMergeBlock}
            />
          ))}
        </div>
      </div>
      <div className="Panel">
        <Inspector className="Inspector" data={data} cursor={cursor} onSplitBlock={onSplitBlock} />
        <DropArea onUpdateData={setData} />
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default App;
