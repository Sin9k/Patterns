import React, { useCallback } from 'react';

/** @typedef {import('./container').IContainer} IContainer */
/** @type {import('react').Context<IContainer | null>} */
const containerContext = React.createContext(null);

/** @typedef {{ container: IContainer, children: import('react').ReactNode }} ContainerProviderProps */

/** @type {(props: ContainerProviderProps) => JSX.Element} */
export const ContainerProvider = ({ container, children }) => (
  <containerContext.Provider value={container}>
    {children}
  </containerContext.Provider>
);

/** @type {() => <T>(fn: import('./container').Thunk<T>) => T} */
export function useRun() {
  const container = React.useContext(containerContext);

  if (container == null) {
    throw TypeError('Container is not placed into the context.');
  }

  return useCallback(fn => fn(container), [container]);
}

/** @type{{
(): IContainer;
<T extends keyof IContainer>(token: T): [IContainer[T]];
<
  T1 extends keyof IContainer,
  T2 extends Exclude<keyof IContainer, T1>
>(token1: T1, token2: T2): [IContainer[T1], IContainer[T2]];
<
  T1 extends keyof IContainer,
  T2 extends Exclude<keyof IContainer, T1>
  T3 extends Exclude<keyof IContainer, T1 | T2>
>(token1: T1, token2: T2, token3: T3): [IContainer[T1], IContainer[T2], IContainer[T3]];
<
  T1 extends keyof IContainer,
  T2 extends Exclude<keyof IContainer, T1>
  T3 extends Exclude<keyof IContainer, T1 | T2>
  T4 extends Exclude<keyof IContainer, T1 | T2 | T3>
>(token1: T1, token2: T2, token3: T3, token4: T4): [IContainer[T1], IContainer[T2], IContainer[T3], IContainer[T4]];
}} */
export function useRead(...tokens) {
  const container = React.useContext(containerContext);

  if (container == null) {
    throw TypeError('Container is not placed into the context.');
  }

  return tokens.length > 0 ? tokens.map(token => container[token]) : container;
}
