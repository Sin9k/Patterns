import React, { useCallback } from 'react';

/** @typedef {import('../interfaces').ICurrentAddressProvider} ICurrentAddressProvider */

const currentAddressProviderContext = /** @type {import('react').Context<ICurrentAddressProvider | null>} */ (
  React.createContext(null)
);

/** @typedef {{ provider: ICurrentAddressProvider, children: import('react').ReactNode }} CurrentAddressProviderProps */

/** @type {(props: CurrentAddressProviderProps) => JSX.Element} */
export const CurrentAddressProvider = ({ provider, children }) => (
  <currentAddressProviderContext.Provider value={provider}>
    {children}
  </currentAddressProviderContext.Provider>
);

/** @type {() => () => Promise<import('../domain').Address>} */
export function useGetCurrentAddress() {
  const currentAddressProvider = React.useContext(currentAddressProviderContext);

  if (currentAddressProvider == null) {
    throw TypeError('ICurrentAddressProvider is not placed into the context.');
  }

  return useCallback(
    () => currentAddressProvider.getCurrentAddress(),
    [currentAddressProvider],
  );
}
