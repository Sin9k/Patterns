import currentLocationReceiver from "@/packages/currentLocationReceiver";
import addressManager from "@/packages/addressManager";

import noLocationAccess from "../noLocationAccess";

export default async () => {
  const coordinates = await currentLocationReceiver.getCurrentLocation();

  if (!coordinates) {
    noLocationAccess();
    return;
  }

  const address =
    await addressManager.convertCoordinatesToRegistrationFormAddress(
      coordinates
    );

  if (!address) {
    noLocationAccess();
    return;
  }

  updateForm(address);
};
