import { PlayTableSize, PointOfPlayTable, OverEdgeResult } from "./types";

export default class PlayTable {
  size: PlayTableSize;
  constructor(size: PlayTableSize) {
    this.size = size;
  }
  isOverEdgeX(point: PointOfPlayTable) {
    const result: OverEdgeResult = {
      isOver: false,
      value: point.x,
    };
    if (point.x <= 0) {
      console.log("your robot reaches west edge of table");
      result.isOver = true;
      result.value = 0;
      return result;
    }
    if (point.x >= this.size.width) {
      console.log("your robot reaches east edge of table");
      result.isOver = true;
      result.value = this.size.width;
    }
    return result;
  }
  isOverEdgeY(point: PointOfPlayTable) {
    const result: OverEdgeResult = {
      isOver: false,
      value: point.y,
    };
    if (point.y <= 0) {
      console.log("your robot reaches south edge of table");
      result.isOver = true;
      result.value = 0;
      return result;
    }
    if (point.y >= this.size.height) {
      console.log("your robot reaches north edge of table");
      result.isOver = true;
      result.value = this.size.height;
      return result;
    }
    return result;
  }
  getValidPoint(point: PointOfPlayTable) {
    return {
      x: this.isOverEdgeX(point).value,
      y: this.isOverEdgeY(point).value,
    };
  }
}
