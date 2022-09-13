import diContainer from 'true-di';
import CoordsCurrentAddressProvider from '../../packages/CoordsCurrentAddressProvider';
import GoogleAddressResolver from '../../packages/GoogleAddressResolver';
import NavigatorLocationProvider from '../../packages/NavigatorLocationProvider';

const container = /** @type {import('./container').IContainer} */ (
  diContainer({
    currentLocationProvider: () => NavigatorLocationProvider(navigator.geolocation),
    addressResolver: () => GoogleAddressResolver('Some-Api-Key', global.fetch),
    currentAddressProvider: ({ currentLocationProvider, addressResolver }) =>
      CoordsCurrentAddressProvider(currentLocationProvider, addressResolver),
  })
);

export default container;
