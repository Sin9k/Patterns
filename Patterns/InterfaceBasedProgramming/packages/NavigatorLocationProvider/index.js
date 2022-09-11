import AppError from '../AppError';
import { coordsFromGeoPosition, errorCodeFromPosErrCode, isAccurate } from './coords';

/** @type {(geolocation: Pick<Geolocation, 'getCurrentPosition'>) => import('../interfaces').ICurrentLocationProvider} */
const NavigatorLocationProvider = (geolocation) => ({
  getCurrentLocation: () => new Promise(
    (resolve, reject) => geolocation.getCurrentPosition(
      position => {
        if (position == null) {
          return reject(AppError(
            'EPOSITION_UNAVAILABLE',
            `getCurrentPosition resolved with "${position}".`,
          ));
        }

        if (!isAccurate(position)) {
          return reject(AppError(
            'EPOSITION_UNAVAILABLE',
            `Accuracy ${position.coords.accuracy}m is not enough.`,
          ));
        }

        resolve(coordsFromGeoPosition(position));
      },
      ({ code, message }) => reject(AppError(
        errorCodeFromPosErrCode(code),
        message,
      )),
    ),
  ),
});

export default NavigatorLocationProvider;
