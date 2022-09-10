/** @type {(position: GeolocationPosition) => import('../domain').Coords} */
export const coordsFromGeoPosition = ({ coords }) => ({
  lat: coords.latitude,
  lng: coords.longitude,
});

export const MAX_ACCEPTABLE_ACCURACCY = 50 /* meters */;

/** @type {(position: GeolocationPosition) => boolean */
export const isAccurate = ({ coords }) => coords.accuracy <= MAX_ACCEPTABLE_ACCURACCY;

/**
 * GeolocationPositionError['error']:
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError#properties
 */
const PERMISSION_DENIED = 1;
const POSITION_UNAVAILABLE = 2;
const TIMEOUT = 3;

/** @type {(code: GeolocationPositionError['code']) => string} */
export const errorCodeFromPosErrCode = (code) => 
  code === 1 ? 'EPERMISSION_DENIED' :
  code === GeolocationPositionError.POSITION_UNAVAILABLE ? 'EPOSITION_UNAVAILABLE' :
  code === GeolocationPositionError.TIMEOUT ? 'ETIMEOUT' :
  'EUNKNOWN';