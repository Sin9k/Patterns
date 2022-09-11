/** @typedef {import('../interfaces').ICurrentLocationProvider } ICurrentLocationProvider */
/** @typedef {import('../interfaces').IAddressResolver } IAddressResolver */
/** @typedef {import('../interfaces').ICurrentAddressProvider } ICurrentAddressProvider */

/** @type {(currentLocationProvider: ICurrentLocationProvider, addressResolver: IAddressResolver) => ICurrentAddressProvider} */
const CoordsCurrentAddressProvider = (currentLocationProvider, addressResolver) => ({
  getCurrentAddress: () => currentLocationProvider
    .getCurrentLocation()
    .then(addressResolver.resolveAddressByCoords),
});

export default CoordsCurrentAddressProvider;
