import { CurrentAddressProvider } from '../packages/CurrentAddressProviderReact';
import RegistrationForm from './RegistrationForm';
import currenAddressProvider from './NavGoogleCurrentAddressProvider/NavGoogleCurrentAddressProcider';

const App = () => (
  <CurrentAddressProvider provider={currenAddressProvider}>
    <RegistrationForm />
  </CurrentAddressProvider>
);

export default App;
