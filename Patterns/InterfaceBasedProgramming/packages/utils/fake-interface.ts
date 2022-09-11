type AnyFn = (...args: any[]) => any;

type MockOf<F extends AnyFn> = jest.MockInstance<ReturnType<F>, Parameters<F>>;

type WithMock<C extends {}> = {
  [p in keyof C]: C[p] extends AnyFn ? C[p] & MockOf<C[p]> : C[p];
};

const FakeInterface = <C extends {}>(): WithMock<C> =>
  new Proxy(
    {},
    {
      set: (target: any, name: string, value: any) => {
        target[name] = value;
        return value;
      },
      get: (target: any, name: string) => {
        target[name] = target[name] ?? jest.fn();
        return target[name];
      },
    },
  );

export default FakeInterface;
