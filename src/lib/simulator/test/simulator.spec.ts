import Simulator from "../simulator";
import _random from "lodash/random";
import _isEqual from "lodash/isEqual";
import assert from "assert";
import { RobotFaceDirection } from "../../robot/types";
import sinon from "sinon";

const MAX_DISTANCE = 20;

describe("Test simulator", function () {
  const point = {
    x: _random(-MAX_DISTANCE, MAX_DISTANCE),
    y: _random(-MAX_DISTANCE, MAX_DISTANCE),
  };
  const faceDirection = _random(0, 3) * 90;

  const status = { point, faceDirection };
  describe("create simulator successfully when call static method place.", function () {
    const simulator = Simulator.place(status);
    it("should return a new simulator instance", function () {
      assert.strictEqual(simulator instanceof Simulator, true);
    });
  });
  describe("move robot as expected", function () {
    const status = { point, faceDirection: RobotFaceDirection.EAST };
    const simulator = Simulator.place(status);
    const getMoveTarget = sinon.stub(simulator.robot, "getMoveTarget");
    const fakedValidPoint = {
      x: _random(0, simulator.playTable.size.width),
      y: _random(0, simulator.playTable.size.height),
    };
    getMoveTarget.returns(point);
    const getValidPoint = sinon.stub(simulator.playTable, "getValidPoint");
    getValidPoint.returns(fakedValidPoint);
    const moveTo = sinon.stub(simulator.robot, "moveTo");

    it("should call this.robot.getMoveTarget", function () {
      simulator.move();
      assert.strictEqual(getMoveTarget.calledWith(), true);
    });
    it("should call this.playTable.getValidPoint", function () {
      assert.strictEqual(getValidPoint.calledWith(point), true);
    });
    it("should call this.robot.moveTo", function () {
      assert.strictEqual(moveTo.calledWith(fakedValidPoint), true);
    });
  });
  describe("robot turn left as expected", function () {
    const status = { point, faceDirection };
    const simulator = Simulator.place(status);
    const left = sinon.stub(simulator.robot, "left");

    it("should call this.robot.left", function () {
      simulator.left();
      assert.strictEqual(left.calledWith(), true);
    });
  });
  describe("robot turn right as expected", function () {
    const status = { point, faceDirection };
    const simulator = Simulator.place(status);
    const right = sinon.stub(simulator.robot, "right");

    it("should call this.robot.right", function () {
      simulator.right();
      assert.strictEqual(right.calledWith(), true);
    });
  });
  describe("simulator getReport as expected", function () {
    const status = { point, faceDirection };
    const simulator = Simulator.place(status);
    const getReport = sinon.stub(simulator.robot, "getCurrentStatus");

    it("should call this.robot.right", function () {
      simulator.getReport();
      assert.strictEqual(getReport.calledWith(), true);
    });
  });
  describe("simulator restRobot as expected", function () {
    const status = { point, faceDirection };
    const simulator = Simulator.place(status);
    const resetRobot = sinon.stub(simulator.robot, "reset");

    it("should call this.robot.right", function () {
      const newStatus = { point, faceDirection };
      simulator.resetRobot(newStatus);
      assert.strictEqual(resetRobot.calledWith(newStatus), true);
    });
  });
});
