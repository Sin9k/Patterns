import getAddressByCoordinates from "../getAddressByCoordinates";

export default (coordinates) => {
  const address = getAddressByCoordinates(coordinates);

  if (!address) {
    return null;
  }

  const registrationFormAddress = address.results[0].address_components.reduce(
    (memo, item) => {
      if (item.types.includes("postal_code")) {
        memo.postalCode = item.short_name;
      } else if (item.types.includes("country")) {
        memo.country = item.short_name;
      } else if (item.types.includes("locality")) {
        memo.city = item.short_name;
      } else if (item.types.includes("route")) {
        memo.streetName = item.short_name;
      } else if (item.types.includes("street_number")) {
        memo.houseNumber = item.short_name;
      }

      return memo;
    },
    {}
  );

  return registrationFormAddress;
};
