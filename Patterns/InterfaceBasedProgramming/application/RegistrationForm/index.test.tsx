import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ICurrentAddressProvider } from '../../packages/interfaces';
import FakeInterface from '../../packages/utils/fake-interface';
import { IContainer } from '../container/container';
import { ContainerProvider } from '../container/container-react-binding';
import RegistrationForm from '.';

describe('RegistrationForm', () => {
  const container = FakeInterface<IContainer>();
  const currentAddressProvider = FakeInterface<ICurrentAddressProvider>();
  container.currentAddressProvider = currentAddressProvider;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('could be filled with current address', async () => {
    expect.assertions(1);

    render(
      <ContainerProvider container={container}>
        <RegistrationForm />
      </ContainerProvider>,
    );

    currentAddressProvider.getCurrentAddress.mockResolvedValueOnce({ city: 'Roma' });

    await userEvent.click(screen.getByText('Fill With Current Address'));

    expect(screen.getByLabelText('city:')).toHaveValue('Roma');
  });
});
