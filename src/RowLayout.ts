import Layout from './Layout';

export default class RowLayout extends Layout {
  rowHeight: number;

  constructor(length: number, columns: number, rowHeight: number) {
    super(length);
    this.columns = columns;
    this.rowHeight = rowHeight;
  }

  getHeight = () => Math.ceil(this.length / this.columns) * this.rowHeight;
}
