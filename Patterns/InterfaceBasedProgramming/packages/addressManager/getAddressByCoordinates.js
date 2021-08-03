import axios from "axios";

export default (coordinates) => {
  try {
    const { data } = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?",
      {
        params: {
          latlng: `${coordinates.lat}, ${coordinates.lng}`,
          key: "SomeKey",
          language: "en",
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
