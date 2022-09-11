import diContainer from 'true-di';
import CoordsCurrentAddressProvider from '../packages/CoordsCurrentAddressProvider';
import GoogleAddressResolver from '../packages/GoogleAddressResolver';
import NavigatorLocationProvider from '../packages/NavigatorLocationProvider';

/** @type {import('./container').IContainer} */
const container = diContainer({
  currentLocationProvider: () => NavigatorLocationProvider(navigator.geolocation),
  addressResolver: () => GoogleAddressResolver('Some-Api-Key', global.fetch),
  currentAddressProvider: ({ currentLocationProvider, addressResolver }) =>
    CoordsCurrentAddressProvider(currentLocationProvider, addressResolver),
});

export default container;
