/** @type {(position: GeolocationPosition) => import('../domain').Coords} */
export const coordsFromGeoPosition = ({ coords }) => ({
  lat: coords.latitude,
  lng: coords.longitude,
});

export const MAX_ACCEPTABLE_ACCURACCY = 50; /* meters */

/** @type {(position: GeolocationPosition) => boolean} */
export const isAccurate = ({ coords }) => coords.accuracy <= MAX_ACCEPTABLE_ACCURACCY;

/**
 * GeolocationPositionError['error']:
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError#properties
 */
export const PERMISSION_DENIED = 1;
export const POSITION_UNAVAILABLE = 2;
export const TIMEOUT = 3;

/** @type {(code: GeolocationPositionError['code']) => string} */
export const errorCodeFromPosErrCode = (code) =>
  code === PERMISSION_DENIED ? 'EPERMISSION_DENIED' :
  code === POSITION_UNAVAILABLE ? 'EPOSITION_UNAVAILABLE' :
  code === TIMEOUT ? 'ETIMEOUT' :
  'EUNKNOWN';
