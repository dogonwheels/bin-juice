export default abstract class Layout {
  columns = 1;
  length: number;

  constructor(length: number) {
    this.length = length;
  }

  abstract getHeight: () => number;
}
