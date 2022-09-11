
/**
see: https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingResults

@typedef {{
 types: string[],
 formatted_address: string,
 address_components: Array<{
   short_name: string,
   long_name: string,
   postcode_localities: string[],
   types: string[]
}>} GeocodingResult */

/** @type {(result: GeocodingResult) => import('../domain').Address} */
// eslint-disable-next-line camelcase
export const addressFromGeocodingResult = ({ address_components }) => address_components.reduce(
  (address, addressComponent) => {
    if (addressComponent.types.includes('postal_code')) {
      address.postalCode = addressComponent.short_name;
    } else if (addressComponent.types.includes('country')) {
      address.country = addressComponent.short_name;
    } else if (addressComponent.types.includes('locality')) {
      address.city = addressComponent.short_name;
    } else if (addressComponent.types.includes('route')) {
      address.streetName = addressComponent.short_name;
    } else if (addressComponent.types.includes('street_number')) {
      address.houseNumber = addressComponent.short_name;
    }

    return address;
  },
  /** @type {Address} */
  {},
);
