import FakeInterface from '../utils/fake-interface';
import { PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT } from './coords';
import NavigatorLocationProvider from './index';

describe('NavigatorLocationProvider', () => {
  const geolocation = FakeInterface<Pick<Geolocation, 'getCurrentPosition'>>();
  const navigatorLocationProvider = NavigatorLocationProvider(geolocation);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('__init__', () => {
    it('should be created by calling factory', () => {
      expect(navigatorLocationProvider).toBeDefined();
    });

    it('exposes method getCurrentLocation', () => {
      expect(navigatorLocationProvider.getCurrentLocation).toBeInstanceOf(Function);
    });
  });

  describe('.getCurrentLocation', () => {
    const { getCurrentLocation } = navigatorLocationProvider;
    it('returns Coords if geolocation returns GeoPosition', async () => {
      expect.assertions(2);

      geolocation.getCurrentPosition.mockImplementationOnce(success => success({
        coords: {
          accuracy: 20,
          altitude: null,
          heading: null,
          latitude: 100,
          longitude: 1000,
          altitudeAccuracy: null,
          speed: null,
        },
        timestamp: Date.now(),
      }));

      const coords = await getCurrentLocation();

      expect(coords).toEqual({ lat: 100, lng: 1000 });
      expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('rejects promise with error code EPOSITION_UNAVAILABLE if coords occuracy greater then 50 meters', async () => {
      expect.assertions(2);

      geolocation.getCurrentPosition.mockImplementationOnce(success => success({
        coords: {
          accuracy: 60,
          altitude: null,
          heading: null,
          latitude: 100,
          longitude: 1000,
          altitudeAccuracy: null,
          speed: null,
        },
        timestamp: Date.now(),
      }));

      const error = await getCurrentLocation().catch(err => err);

      expect(error).toEqual({
        code: 'EPOSITION_UNAVAILABLE',
        message: 'Accuracy 60m is not enough.',
      });
      expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it.each([
      null,
      undefined,
    ])('rejects promise with error code EPOSITION_UNAVAILABLE if geolocation returns %s', async (emptyValue) => {
      expect.assertions(2);

      geolocation.getCurrentPosition.mockImplementationOnce(success => success(emptyValue as any));

      const error = await getCurrentLocation().catch(err => err);

      expect(error).toEqual({
        code: 'EPOSITION_UNAVAILABLE',
        message: `getCurrentPosition resolved with "${emptyValue}".`,
      });
      expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['EPERMISSION_DENIED', PERMISSION_DENIED],
      ['EPOSITION_UNAVAILABLE', POSITION_UNAVAILABLE],
      ['ETIMEOUT', TIMEOUT],
      ['EUNKNOWN', -1],
    ])('rejects promise with error code %s if geolocation fails with code %d', async (errorCode, code) => {
      expect.assertions(2);

      geolocation.getCurrentPosition.mockImplementationOnce(
        (_, failure) => typeof failure === 'function'
          ? failure({ code, message: 'some error message' } as any)
          : undefined,
      );

      const error = await getCurrentLocation().catch(err => err);

      expect(error).toEqual({
        code: errorCode,
        message: expect.any(String),
      });
      expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });
  });
});
