# robot_simulation

### Instal:

```bash
    yarn init
```

### Development

```bash
    yarn dev
```

### Production

```bash
    yarn start
```

### Test

```bash
    yarn test
```

### Sample code:

1. After start the robot simulator you need place the your robot firstly.

```bash
    PLACE 1,1,EAST
```

2. Once you placed your robot successfully. you can use following command to control your robot :

- Move:

  move one unit of your robot depends on face direction of the robot.

```bash
    MOVE
```

- Left:

  turn 90 degrees of your robot to left side.

```bash
    LEFT
```

- RIGHT:

  turn 90 degrees of your robot to right side.

```bash
    RIGHT
```

- REPORT:

  Print current status of your robot includes position with (x,y) and face direction.

```bash
    REPORT
```

- EXIT:

  Close current simulator.

```bash
    EXIT
```

TODO:

- Test for commandLineListener
