import CoordsCurrentAddressProvider from '.';
import { IAddressResolver, ICurrentLocationProvider } from '../interfaces';
import FakeInterface from '../utils/fake-interface';

describe('CoordsCurrentAddressProvider', () => {
  const currentLocationProvider = FakeInterface<ICurrentLocationProvider>();
  const addressResolver = FakeInterface<IAddressResolver>();

  const currentAddressProvider = CoordsCurrentAddressProvider(currentLocationProvider, addressResolver);

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('__init__', () => {
    it('should be created with factory function CoordsCurrentAddressProvider', () => {
      expect(currentAddressProvider).toBeDefined();
    });

    it('exposes method getCurrentAddress', () => {
      expect(currentAddressProvider.getCurrentAddress).toBeInstanceOf(Function);
    });
  });
});
