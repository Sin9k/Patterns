import AppError from '../AppError';
import { buildQuery } from '../utils/buildQuery';
import { addressFromGeocodingResult } from './address';

/** @typedef {(input: URL, init?: RequestInit) => Promise<Response>} FetchFn */
/** @type {(apiKey: string, fetchFn?: FetchFn) => import("../interfaces").IAddressResolver} */
const GoogleAddressResolver = (apiKey, fetchFn = fetch) => ({
  async resolveAddressByCoords({ lat, lng }) {
    let result, body;

    try {
      result = await fetchFn(
        `https://maps.googleapis.com/maps/api/geocode/json?${buildQuery({
          latlng: `${lat}, ${lng}`,
          key: apiKey,
          language: 'en',
        })}`,
      );
      body = await result.json();
    } catch (error) {
      throw AppError(
        'EADDRESS_NOT_RESOLVED',
        `Failed to fetch address or to parse the response: ${error instanceof Error ? error.message : error}`,
      );
    }

    if (!result.ok) throw AppError('EADDRESS_NOT_RESOLVED', body.error_message);

    // TODO: prove type of Google result here

    return addressFromGeocodingResult(body.results[0]);
  },
});

export default GoogleAddressResolver;
