import React from 'react';
import { ContainerProvider } from './container/container-react-binding';
import RegistrationForm from './RegistrationForm';
import container from './container';

const App = () => (
  <ContainerProvider container={container}>
    <RegistrationForm />
  </ContainerProvider>
);

export default App;
