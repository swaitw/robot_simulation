import { PointOfPlayTable } from "../play_table/types";
import { RobotStatus, RobotFaceDirection } from "./types";

export default class Robot {
  status: RobotStatus;
  constructor(status: RobotStatus) {
    this.status = status;
  }
  static faceDirectionToString(faceDirection: RobotFaceDirection) {
    switch (faceDirection) {
      case RobotFaceDirection.NORTH:
        return "NORTH";
      case RobotFaceDirection.WEST:
        return "WEST";
      case RobotFaceDirection.SOUTH:
        return "SOUTH";
      case RobotFaceDirection.EAST:
      default:
        return "EAST";
    }
  }
  getMoveTarget() {
    const targetPoint = this.status.point;
    switch (this.status.faceDirection) {
      case RobotFaceDirection.WEST:
        targetPoint.x -= 1;
        break;
      case RobotFaceDirection.NORTH:
        targetPoint.y += 1;
        break;
      case RobotFaceDirection.SOUTH:
        targetPoint.y -= 1;
        break;
      case RobotFaceDirection.EAST:
      default:
        targetPoint.x += 1;
        break;
    }
    return targetPoint;
  }
  moveTo(point: PointOfPlayTable) {
    this.status.point = point;
  }
  getFaceDirection(changedAngle: number) {
    const angleAfterChanged =
      (this.status.faceDirection + changedAngle + 360) % 360;
    switch (angleAfterChanged) {
      case 90:
        return RobotFaceDirection.NORTH;
      case 180:
        return RobotFaceDirection.WEST;
      case 270:
        return RobotFaceDirection.SOUTH;
      case 0:
      default:
        return RobotFaceDirection.EAST;
    }
  }

  left() {
    this.status.faceDirection = this.getFaceDirection(90);
  }
  right() {
    this.status.faceDirection = this.getFaceDirection(-90);
  }

  getCurrentStatus() {
    return this.status;
  }
  getCurrentFaceDirectionString() {
    return Robot.faceDirectionToString(this.status.faceDirection);
  }

  reset(status: RobotStatus) {
    this.status = status;
    return this;
  }
}
