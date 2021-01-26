import BlockType from './BlockType';
import HexLayout from './HexLayout';
import TextLayout from './TextLayout';
import PixelLayout from './PixelLayout';

const layoutsForType = {
  [BlockType.Hex]: HexLayout,
  [BlockType.Text]: TextLayout,
  [BlockType.Pixel]: PixelLayout,
};

export default layoutsForType;
