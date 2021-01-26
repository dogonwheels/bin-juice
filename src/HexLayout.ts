import Layout from './Layout';

const rowHeight = 32;

export default class HexLayout extends Layout {
  static columns = 16;

  getHeight = () => Math.ceil(this.length / HexLayout.columns) * rowHeight;

  getTopFor = (address: number) => {
    return 0;
  };
  getAddressFor = (position: number) => {
    return 0;
  };
}
