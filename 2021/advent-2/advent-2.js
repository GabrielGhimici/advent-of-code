const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

const routeConfig = {
  default: {
    forward: {
      changeKey: ["position"],
      changeSign: 1,
    },
    down: {
      changeKey: ["depth"],
      changeSign: 1,
    },
    up: {
      changeKey: ["depth"],
      changeSign: -1,
    },
  },
  complex: {
    forward: {
      changeKey: ["position", "depth"],
      changeSign: 1,
    },
    down: {
      changeKey: ["aim"],
      changeSign: 1,
    },
    up: {
      changeKey: ["aim"],
      changeSign: -1,
    },
  },
};

const route = [];

readInterface.on("line", (line) => {
  const splittedLine = line.split(" ");
  route.push({ action: splittedLine[0], value: Number(splittedLine[1]) });
});

readInterface.on("close", () => {
  console.log("First response", computeDestination(route, "default"));
  console.log("Second response", computeDestination(route, "complex"));
});

function computeDestination(route, context) {
  const result = {
    position: 0,
    aim: 0,
    depth: 0,
  };
  route.forEach((step) => {
    const stepConfig = routeConfig[context][step.action];
    stepConfig.changeKey.forEach((key) => {
      result[key] = computeValue(
        result[key],
        step.value,
        stepConfig.changeSign,
        context,
        result.aim,
        key === "depth"
      );
    });
  });
  return result.position * result.depth;
}

function computeValue(existingValue, newValue, sign, context, aim, withAim) {
  switch (context) {
    case "default":
      return existingValue + sign * newValue;
    case "complex":
      return withAim
        ? existingValue + newValue * aim
        : existingValue + sign * newValue;
    default:
      return -1;
  }
}
