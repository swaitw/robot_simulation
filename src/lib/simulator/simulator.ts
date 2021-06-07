import PlayTable from "../play_table/play_table";
import Robot from "../robot/robot";
import { RobotStatus } from "../robot/types";

export default class Simulator {
  playTable: PlayTable;
  robot: Robot;
  constructor(robot: Robot, playTable: PlayTable) {
    this.robot = robot;
    this.playTable = playTable;
  }

  static place(status: RobotStatus) {
    const playTable = new PlayTable({ width: 5, height: 5 });
    const validPoint = playTable.getValidPoint(status.point);
    const simulator = new Simulator(
      new Robot({ point: validPoint, faceDirection: status.faceDirection }),
      playTable
    );

    return simulator;
  }

  move() {
    const targetPoint = this.robot.getMoveTarget();
    const validPoint = this.playTable.getValidPoint(targetPoint);
    this.robot.moveTo(validPoint);
    return this;
  }
  left() {
    this.robot.left();
    return this;
  }
  right() {
    this.robot.right();
    return this;
  }
  getReport() {
    return this.robot.getCurrentStatus();
  }
  resetRobot(status: RobotStatus) {
    this.robot.reset(status);
    return this;
  }
}
