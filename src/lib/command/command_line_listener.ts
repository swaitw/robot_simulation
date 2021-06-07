import Readline from "readline";
import Robot from "../robot/robot";
import { RobotStatus, RobotFaceDirection } from "../robot/types";
import Simulator from "../simulator/simulator";
import { COMMAND } from "./types";

export default class CommandLineListener {
  simulator?: Simulator;
  readline: Readline.Interface;
  constructor() {
    this.readline = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
  }
  handlePlace(argString: string) {
    if (!argString) {
      throw new Error("Please use place with args, like PLACE 0,0,WEST.");
    }
    const [inputX, inputY, inputF] = argString.split(",");
    const x = parseInt(inputX, 10);
    const y = parseInt(inputY, 10);
    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new Error(
        "Please enter a number for your point args, like 0,0,WEST."
      );
    }

    const status: Partial<RobotStatus> = {
      point: { x, y },
    };
    switch (inputF) {
      case "EAST":
        status.faceDirection = RobotFaceDirection.EAST;
        break;
      case "WEST":
        status.faceDirection = RobotFaceDirection.WEST;
        break;
      case "SOUTH":
        status.faceDirection = RobotFaceDirection.SOUTH;
        break;
      case "NORTH":
        status.faceDirection = RobotFaceDirection.NORTH;
        break;
      default:
        throw new Error(
          "Your face direction arg is invalid, should be one of (WEST EAST NORTH SOUTH)."
        );
    }
    try {
      if (!this.simulator) {
        this.simulator = Simulator.place(status as RobotStatus);
      } else {
        this.simulator.resetRobot(status as RobotStatus);
      }
      console.log(
        `Your robot placed successfully, now it is at ${x},${y}, and face to ${this.simulator.robot.getCurrentFaceDirectionString()}.`
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  parseInput(input: string) {
    const [command, args] = input.split(" ");
    return { command, args };
  }

  handleTurnLeft() {
    this.simulator?.left();
    console.log(
      `Your robot turn left successfully, now it face to ${this.simulator?.robot.getCurrentFaceDirectionString()}.`
    );
  }

  handleTurnRight() {
    this.simulator?.right();
    console.log(
      `Your robot turn right successfully, now it face to ${this.simulator?.robot.getCurrentFaceDirectionString()}.`
    );
  }

  handlePrintReport() {
    const report = this.simulator?.robot.getCurrentStatus();
    if (report) {
      console.log(
        "Your robot currently located at:\n",
        report?.point.x,
        report?.point.y,
        Robot.faceDirectionToString(report?.faceDirection)
      );
    } else {
      console.log("No report found for your robot.");
    }
  }
  handleMove() {
    this.simulator?.move();
    const { x, y } = this.simulator?.robot.getCurrentStatus().point || {};
    console.log(`Your robot has moved to: ${x},${y}`);
  }

  exit() {
    this.readline.close();
    console.log(`Your Simulator is closed`);
  }

  handleInput(input: string) {
    const { command, args } = this.parseInput(input);
    if (command == COMMAND.EXIT) {
      return this.exit();
    }

    try {
      if (command !== COMMAND.PLACE && !this.simulator) {
        throw new Error(
          "Your need place your robot on the play table firstly."
        );
      }

      switch (command) {
        case COMMAND.PLACE:
          this.handlePlace(args);
          break;
        case COMMAND.LEFT:
          this.handleTurnLeft();
          break;
        case COMMAND.RIGHT:
          this.handleTurnRight();
          break;
        case COMMAND.REPORT:
          this.handlePrintReport();
          break;
        case COMMAND.MOVE:
          this.handleMove();
          break;
        case COMMAND.EXIT:
          this.exit();
          break;
        default:
          throw new Error("Your command is not valid.");
      }
    } catch (err) {
      console.log(err.message);
    }
    this.readline.question(
      "Waiting for your next command (Enter EXIT to exit): \n",
      (input: string) => {
        this.handleInput(input);
      }
    );
  }
  start() {
    this.readline.question(
      "Your simulator start successfully (you should place your robot firstly),\nWaiting for your next command (Enter EXIT to exit): \n",
      (input: string) => {
        this.handleInput(input);
      }
    );
  }
}
