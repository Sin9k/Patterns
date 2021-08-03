export default async () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!position || !position.coords) {
          resolve(null);
          return;
        }

        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => resolve(null)
    );
  });
};
