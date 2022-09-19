import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ICurrentAddressProvider } from '../../packages/interfaces';
import FakeInterface from '../../packages/utils/fake-interface';
import { CurrentAddressProvider } from '../../packages/CurrentAddressProviderReact';
import RegistrationForm from '.';

describe('RegistrationForm', () => {
  const currentAddressProvider = FakeInterface<ICurrentAddressProvider>();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('could be filled with current address', async () => {
    expect.assertions(1);

    render(
      <CurrentAddressProvider provider={currentAddressProvider}>
        <RegistrationForm />
      </CurrentAddressProvider>,
    );

    currentAddressProvider.getCurrentAddress.mockResolvedValueOnce({ city: 'Roma' });

    await userEvent.click(screen.getByText('Fill With Current Address'));

    expect(screen.getByLabelText('city:')).toHaveValue('Roma');
  });
});
