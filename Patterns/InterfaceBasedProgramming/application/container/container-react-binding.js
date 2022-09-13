import React, { useCallback } from 'react';

/** @typedef {import('./container').IContainer} IContainer */

const containerContext = /** @type {import('react').Context<IContainer | null>} */ (
  React.createContext(null)
);

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
