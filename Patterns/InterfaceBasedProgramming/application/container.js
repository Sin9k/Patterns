import diContainer from "true-di";
import BomCurrentAddressProvider from "../packages/BomCurrentAddressProvider";
import GoogleAddressResolver from "../packages/GoogleAddressResolver";
import NavigatorLocationProvider from "../packages/NavigatorLocationProvider";

/** @type {import('./container').IContainer} */
const container = diContainer({
  currentLocationProvider: () => NavigatorLocationProvider(navigator.geolocation),
  addressResolver: () => GoogleAddressResolver("Some-Api-Key", global.fetch),
  currentAddressProvider: ({ currentLocationProvider, addressResolver }) =>
    BomCurrentAddressProvider(currentLocationProvider, addressResolver)
});

export default container;