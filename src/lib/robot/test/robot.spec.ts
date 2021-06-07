import assert from "assert";
import _random from "lodash/random";
import _isEqual from "lodash/isEqual";
import Robot from "../robot";
import { PointOfPlayTable } from "../../play_table/types";
import { RobotFaceDirection } from "../types";
const MAX_DISTANCE = 20;

describe("Test play table", function () {
  describe("create right Robot with constructor", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const faceDirection = _random(0, 3) * 90;

    const status = { point, faceDirection };
    const robot = new Robot(status);
    it("should create play table", function () {
      assert.strictEqual(robot instanceof Robot, true);
    });
    it("should match given point", function () {
      assert.strictEqual(robot.status.point, point);
    });
    it("should match given face direction", function () {
      assert.strictEqual(robot.status.faceDirection, faceDirection);
    });
  });
  describe("rest robot with new status", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const faceDirection = _random(0, 3) * 90;

    const status = { point, faceDirection };
    const newPoint = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const robot = new Robot(status);
    const newStatus = { point: newPoint, faceDirection: _random(0, 3) * 90 };
    robot.reset(newStatus);
    it("should match new given point after reset", function () {
      assert.strictEqual(robot.status.point, newStatus.point);
    });
    it("should match new given face direction after reset", function () {
      assert.strictEqual(robot.status.faceDirection, newStatus.faceDirection);
    });
  });
  describe("turn left", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const faceDirection = _random(0, 3) * 90;

    const status = { point, faceDirection };
    const robot = new Robot(status);

    it("should plus 90 degrees after turn left", function () {
      robot.left();
      assert.strictEqual(
        robot.status.faceDirection,
        (faceDirection + 90 + 360) % 360
      );
    });
  });
  describe("turn right", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const faceDirection = _random(0, 3) * 90;

    const status = { point, faceDirection };
    const robot = new Robot(status);
    it("should minus 90 degrees after turn left", function () {
      robot.right();
      assert.strictEqual(
        robot.status.faceDirection,
        (faceDirection + 360 - 90) % 360
      );
    });
  });
  describe("getMoveTarget", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };

    const testGetMoveTarget = (
      faceDirection: RobotFaceDirection,
      expectedPoint: PointOfPlayTable
    ) => {
      const status = { point, faceDirection };
      const robot = new Robot(status);
      const targetPoint = robot.getMoveTarget();
      assert.strictEqual(
        targetPoint.x === expectedPoint.x && targetPoint.y === expectedPoint.y,
        true
      );
    };
    it("should add one unit on point.x when face to east", function () {
      testGetMoveTarget(RobotFaceDirection.EAST, { ...point, x: point.x + 1 });
    });
    it("should minus one unit on point.x when face to west", function () {
      testGetMoveTarget(RobotFaceDirection.WEST, { ...point, x: point.x - 1 });
    });
    it("should add one unit on point.y when face to north", function () {
      testGetMoveTarget(RobotFaceDirection.NORTH, {
        ...point,
        y: point.y + 1,
      });
    });
    it("should minus one unit on point.y when face to south", function () {
      testGetMoveTarget(RobotFaceDirection.SOUTH, {
        ...point,
        y: point.y - 1,
      });
    });
  });
  describe("moveTo", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const faceDirection = _random(0, 3) * 90;
    const status = { point, faceDirection };
    const robot = new Robot(status);
    const targetPoint = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    it("should move to the given point", function () {
      robot.moveTo(targetPoint);
      assert.strictEqual(robot.status.point, targetPoint);
    });
  });
  describe("getFaceDirection", function () {
    const originFaceDirection = RobotFaceDirection.EAST;
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };

    const status = { point, faceDirection: originFaceDirection };
    const robot = new Robot(status);
    const testGetFaceDirection = (
      faceDirection: RobotFaceDirection,
      changeDegrees: number
    ) => {
      const faceDirectionAfterChange = robot.getFaceDirection(changeDegrees);
      assert.strictEqual(faceDirectionAfterChange, faceDirection);
    };
    it("should face to EAST after change 0 degrees ", function () {
      testGetFaceDirection(RobotFaceDirection.EAST, 0);
    });
    it("should face to EAST after change 90 degrees ", function () {
      testGetFaceDirection(RobotFaceDirection.NORTH, 90);
    });
    it("should face to EAST after change 90 degrees ", function () {
      testGetFaceDirection(RobotFaceDirection.WEST, 180);
    });
    it("should face to EAST after change 90 degrees ", function () {
      testGetFaceDirection(RobotFaceDirection.SOUTH, -90);
    });
  });
  describe("getCurrentStatus", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };
    const faceDirection = _random(0, 3) * 90;
    const status = { point, faceDirection };
    const robot = new Robot(status);
    const robotStatus = robot.getCurrentStatus();
    it("should match the passed status", function () {
      assert.strictEqual(status, robotStatus);
    });
  });
  describe("getCurrentFaceDirectionString", function () {
    const point = {
      x: _random(-MAX_DISTANCE, MAX_DISTANCE),
      y: _random(-MAX_DISTANCE, MAX_DISTANCE),
    };

    const testGetCurrentFaceDirectionString = (
      faceDirection: RobotFaceDirection,
      faceDirectionString: string
    ) => {
      const status = { point, faceDirection };
      const robot = new Robot(status);
      const result = robot.getCurrentFaceDirectionString();
      assert.strictEqual(result, faceDirectionString);
    };
    it("should return EAST", function () {
      testGetCurrentFaceDirectionString(RobotFaceDirection.EAST, "EAST");
    });
    it("should return WEST", function () {
      testGetCurrentFaceDirectionString(RobotFaceDirection.WEST, "WEST");
    });
    it("should return NORTH", function () {
      testGetCurrentFaceDirectionString(RobotFaceDirection.NORTH, "NORTH");
    });
    it("should return SOUTH", function () {
      testGetCurrentFaceDirectionString(RobotFaceDirection.SOUTH, "SOUTH");
    });
  });
});
