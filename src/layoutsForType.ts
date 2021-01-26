import BlockType from './BlockType';
import HexLayout from './HexLayout';
import TextLayout from './TextLayout';

const layoutsForType = {
  [BlockType.Hex]: HexLayout,
  [BlockType.Text]: TextLayout,
  // [BlockType.Pixel]: PixelBlock,
};

export default layoutsForType;
