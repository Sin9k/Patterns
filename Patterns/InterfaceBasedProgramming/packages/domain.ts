export type Coords = {
  lat: number
  lng: number
};

export type Address = {
  postalCode?: string
  country?: string
  city?: string
  streetName?: string
  houseNumber?: string
};

export type AppError = {
  code: string
  message: string
};
