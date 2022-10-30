class InputItem {
  constructor(public action: RouteAction, public value: number) {}

  toString() {
    return `[${this.action} -> ${this.value}]`;
  }
}

enum DiveContext {
  Default = 'default',
  Complex = 'complex',
}

enum RouteAction {
  Forward = 'forward',
  Up = 'up',
  Down = 'down',
}

enum ChangeKey {
  Position = 'position',
  Depth = 'depth',
  Aim = 'aim',
}

export { InputItem, DiveContext, RouteAction, ChangeKey };
