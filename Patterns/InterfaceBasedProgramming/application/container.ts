import {
  IAddressResolver,
  ICurrentAddressProvider,
  ICurrentLocationProvider, 
} from "../packages/interfaces";

export interface IContainer {
  currentLocationProvider: ICurrentLocationProvider;
  addressResolver: IAddressResolver;
  currentAddressProvider: ICurrentAddressProvider;
}

export type Thunk<T> = (container: IContainer) => T; 