import * as Domain from './domain';

export interface ICurrentLocationProvider {
  getCurrentLocation: () => Promise<Domain.Coords>
}

export interface IAddressResolver {
  resolveAddressByCoords: (coords: Domain.Coords) => Promise<Domain.Address>
}

export interface ICurrentAddressProvider {
  getCurrentAddress: () => Promise<Domain.Address>
}
