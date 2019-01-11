export class Graph {
  private months: Array<string> = ["january", "february", "march", "april"];
  private values: Array<number> = [1, 2, 3, 4];

  constructor() {}

  public getGraphData() {
    return [{ data: this.values, label: "Sells" }];
  }

  public changeValue(month: string, value: number) {
    month = month.toLowerCase().trim();
    this.values[this.months.findIndex(e => e === month)] += value;

    return this.getGraphData();
  }
}
