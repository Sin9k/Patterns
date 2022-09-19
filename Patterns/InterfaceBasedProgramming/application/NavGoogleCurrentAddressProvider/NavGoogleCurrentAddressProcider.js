import CoordsCurrentAddressProvider from '../../packages/CoordsCurrentAddressProvider';
import GoogleAddressResolver from '../../packages/GoogleAddressResolver';
import NavigatorLocationProvider from '../../packages/NavigatorLocationProvider';

export default CoordsCurrentAddressProvider(
  NavigatorLocationProvider(navigator.geolocation),
  GoogleAddressResolver('Some-Api-Key', global.fetch),
);
