import { ICurrentAddressProvider } from '../packages/CoordsCurrentAddressProvider';
import { Address, AppError } from '../packages/domain';
import FakeInterface from '../packages/utils/fake-interface';

import { fillRegFormWithCurrentAddress } from './fill-registration-form-with-current-address';

describe('fillRegFormWithCurrentAddress', () => {
  const currentAddressProvider = FakeInterface<ICurrentAddressProvider>();
  const updateForm = jest.fn<void, [Address]>();
  const updateError = jest.fn<void, [AppError]>();

  const fillRegFormWithCurrentAddressFn = fillRegFormWithCurrentAddress(updateForm, updateError);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates form with obtained address', async () => {
    expect.assertions(3);
    currentAddressProvider.getCurrentAddress.mockResolvedValue({ city: 'Roma' });

    await fillRegFormWithCurrentAddressFn({ currentAddressProvider });

    expect(updateForm).toHaveBeenCalledTimes(1);
    expect(updateForm).toHaveBeenCalledWith({ city: 'Roma' });
    expect(updateError).not.toBeCalled();
  });

  it('updates form with error if getCurrentAddress fails', async () => {
    expect.assertions(3);
    currentAddressProvider.getCurrentAddress.mockRejectedValue({
      code: 'EUNKNOWN',
      message: 'Error',
    });

    await fillRegFormWithCurrentAddressFn({ currentAddressProvider });

    expect(updateError).toHaveBeenCalledTimes(1);
    expect(updateError).toHaveBeenCalledWith({
      code: 'EUNKNOWN',
      message: 'Error',
    });
    expect(updateForm).not.toBeCalled();
  });
});
