/** @typedef {import('../interfaces').ICurrentLocationProvider } ICurrentLocationProvider */
/** @typedef {import('../interfaces').IAddressResolver } IAddressResolver */
/** @typedef {import('../interfaces').ICurrentAddressProvider } ICurrentAddressProvider */

/** @type {(currentLocationProvider: ICurrentLocationProvider, addressResolver: IAddressResolver) => ICurrentAddressProvider}*/
const BomCurrentAddressProvider = (currentLocationProvider, addressResolver) => ({
  getCurrentAddress: () => currentLocationProvider
    .getCurrentLocation()
    .then(
      currentCoords => addressResolver.resolveAddressByCoords(currentCoords)
    ),
});

export default BomCurrentAddressProvider;