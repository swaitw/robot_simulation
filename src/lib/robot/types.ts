import { PointOfPlayTable } from "../play_table/types";

export enum RobotFaceDirection {
  EAST = 0,
  NORTH = 90,
  WEST = 180,
  SOUTH = 270,
}

export type RobotStatus = {
  point: PointOfPlayTable;
  faceDirection: RobotFaceDirection;
};
