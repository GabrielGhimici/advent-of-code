import { ChangeKey, DiveContext, RouteAction } from '../models/day-2';

type Signum = 1 | -1;

interface RouteActionData {
  changeKey: Array<ChangeKey>;
  changeSign: Signum;
}

interface Route {
  [RouteAction.Forward]: RouteActionData;
  [RouteAction.Down]: RouteActionData;
  [RouteAction.Up]: RouteActionData;
}

interface RouteConfig {
  [DiveContext.Default]: Route;
  [DiveContext.Complex]: Route;
}

export type { RouteConfig, Signum };
