import { createReadInterface, linesToList } from '../core/read-input';
import { ChangeKey, DiveContext, InputItem, RouteAction } from './models/day-2';
import type { RouteConfig, Signum } from './types/day-2';

const routeConfig: RouteConfig = {
  default: {
    forward: {
      changeKey: [ChangeKey.Position],
      changeSign: 1,
    },
    down: {
      changeKey: [ChangeKey.Depth],
      changeSign: 1,
    },
    up: {
      changeKey: [ChangeKey.Depth],
      changeSign: -1,
    },
  },
  complex: {
    forward: {
      changeKey: [ChangeKey.Position, ChangeKey.Depth],
      changeSign: 1,
    },
    down: {
      changeKey: [ChangeKey.Aim],
      changeSign: 1,
    },
    up: {
      changeKey: [ChangeKey.Aim],
      changeSign: -1,
    },
  },
};

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-2`));
  return rawList.map((item: string) => {
    const splittedLine = item.split(' ');
    return new InputItem(splittedLine[0] as RouteAction, Number(splittedLine[1]));
  });
}

function computeDestination(route: Array<InputItem>, context: DiveContext) {
  const result = {
    position: 0,
    aim: 0,
    depth: 0,
  };
  route.forEach((step) => {
    const stepConfig = routeConfig[context][step.action];
    stepConfig.changeKey.forEach((key) => {
      result[key] = computeValue(result[key], step.value, stepConfig.changeSign, context, result.aim, key === 'depth');
    });
  });
  return result.position * result.depth;
}

function computeValue(
  existingValue: number,
  newValue: number,
  sign: Signum,
  context: DiveContext,
  aim: number,
  withAim: boolean
) {
  switch (context) {
    case DiveContext.Default:
      return existingValue + sign * newValue;
    case DiveContext.Complex:
      return withAim ? existingValue + newValue * aim : existingValue + sign * newValue;
    default:
      return -1;
  }
}

async function simpleDive() {
  const data = await getInputData();
  return computeDestination(data, DiveContext.Default);
}

async function complexDive() {
  const data = await getInputData();
  return computeDestination(data, DiveContext.Complex);
}

export { simpleDive, complexDive };
