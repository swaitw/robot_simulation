import assert from "assert";
import PlayTable from "../play_table";
import _random from "lodash/random";
const MAX_SIZE = 10;
const MIN_SIZE = 5;
describe("Test play table", function () {
  const size = {
    width: _random(MIN_SIZE, MAX_SIZE),
    height: _random(MIN_SIZE, MAX_SIZE),
  };
  const playTable = new PlayTable(size);
  describe("create right play table with constructor", function () {
    it("should create play table", function () {
      assert.strictEqual(playTable instanceof PlayTable, true);
    });
    it("should equal to the giving size", function () {
      assert.strictEqual(playTable.size, size);
    });
  });
  describe("isOverEdgeX", function () {
    const x = _random(1, size.width - 1);
    const y = _random(1, size.height - 1);
    const point = { x, y };
    const insidePointTestResult = playTable.isOverEdgeX(point);
    it("should not over edge x when point.x is inside", function () {
      assert.strictEqual(insidePointTestResult.isOver, false);
    });
    it("should return point.x as result.value when point.x is inside", function () {
      assert.strictEqual(insidePointTestResult.value, point.x);
    });
    const outsideEastPoint = { x: _random(size.width, size.width * 2), y };

    const outsideEastPointTestResult = playTable.isOverEdgeX(outsideEastPoint);

    it("should over edge x when point.x is outside", function () {
      assert.strictEqual(outsideEastPointTestResult.isOver, true);
    });

    it("should return size.width as result.value when point.x is outside and positive", function () {
      assert.strictEqual(outsideEastPointTestResult.value, size.width);
    });
    const outsideWestPoint = { x: _random(-size.width, 0), y };

    const outsideWestPointTestResult = playTable.isOverEdgeX(outsideWestPoint);

    it("should over edge x when point.x is outside", function () {
      assert.strictEqual(outsideWestPointTestResult.isOver, true);
    });

    it("should return 0 as result.value when point.x  negative", function () {
      assert.strictEqual(outsideWestPointTestResult.value, 0);
    });
  });
  describe("isOverEdgeY", function () {
    const x = _random(1, size.width - 1);
    const y = _random(1, size.height - 1);
    const point = { x, y };
    const insidePointTestResult = playTable.isOverEdgeY(point);
    it("should not over edge Y", function () {
      assert.strictEqual(insidePointTestResult.isOver, false);
    });
    it("should return point y as result.value", function () {
      assert.strictEqual(insidePointTestResult.value, point.y);
    });

    const outsideNorthPoint = { x, y: _random(size.height, size.height * 2) };

    const outsideNorthPointTestResult =
      playTable.isOverEdgeY(outsideNorthPoint);

    it("should over edge y when point.y is outside", function () {
      assert.strictEqual(outsideNorthPointTestResult.isOver, true);
    });

    it("should return size.height as result.value when point.y is outside and positive ", function () {
      assert.strictEqual(outsideNorthPointTestResult.value, size.height);
    });
    const outsideSouthPoint = { x, y: _random(-size.height, 0) };

    const outsideSouthPointTestResult =
      playTable.isOverEdgeY(outsideSouthPoint);

    it("should over edge y when point.y is outside", function () {
      assert.strictEqual(outsideSouthPointTestResult.isOver, true);
    });

    it("should return 0 as result.value when point.y  negative ", function () {
      assert.strictEqual(outsideSouthPointTestResult.value, 0);
    });
  });

  describe("getValidPoint", function () {
    it("should return original point when point is inside of the table", function () {
      const x = _random(0, size.width);
      const y = _random(0, size.height);
      const point = { x, y };
      const validPoint = playTable.getValidPoint(point);
      assert.strictEqual(
        validPoint.x === point.x && validPoint.y === point.y,
        true
      );
    });
    it("should return a new point which is on the edges of the table when origin point is outside", function () {
      const x = _random(-size.width, size.width * 2);
      const y = _random(-size.height, size.height * 2);
      const point = { x, y };
      const validPoint = playTable.getValidPoint(point);
      assert.strictEqual(
        validPoint.x >= 0 &&
          validPoint.y >= 0 &&
          validPoint.x <= size.width &&
          validPoint.y <= size.height,
        true
      );
    });
  });
});
