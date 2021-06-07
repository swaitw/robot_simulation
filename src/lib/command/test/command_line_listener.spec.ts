import assert from "assert";
import CommandLineListener from "../command_line_listener";
import Readline from "readline";
import sinon from "sinon";

describe("command_line_listener", function () {
  const commandListener = new CommandLineListener();
  afterEach(function () {
    commandListener.exit();
  });
  describe("create new CommandLineListener", function () {
    it("should create new CommandLineListener instance", function () {
      assert.strictEqual(commandListener instanceof CommandLineListener, true);
    });
  });
  describe("start commandLineListener", function () {
    const question = sinon.stub(commandListener.readline, "question");
    it("should start commandLineListener after call commandLineListener.start", function () {
      commandListener.start();

      assert.strictEqual(question.called, true);
    });
    //TODO: finish all other tests
  });
});
