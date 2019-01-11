export class Graph {
  private months: Array<string> = ["january", "february", "march", "april"];
  private values: Array<number> = [1, 2, 3, 4];

  private test: Array<string> = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8'];
  private points: Array<number> = [5, 9, 6, 7, 1, 2, 3, 4];

  constructor() {}

  public getGraphData() {
    return [{ data: this.values, label: "Sells" }];
  }

  public getBarGraphData() {
    return [{ data: this.points, label: "Tests" }];
  }

  public changeValueLineGraph(month: string, value: number) {
    month = month.toLowerCase().trim();
    this.values[this.months.findIndex(e => e === month)] += value;

    return this.getGraphData();
  }

  public changeValueBarGraph(index: number, value: number) {
    this.points[index] += value;
    return this.getBarGraphData();
  }
}
