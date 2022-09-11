/** @typedef {import('../packages/domain').Address} Address */
/** @typedef {import('../packages/domain').AppError} AppError */

/** @typedef {{ currentAddressProvider: import('../packages/interfaces').ICurrentAddressProvider }} RegFormFillerDeps */

/**
 * @template T
 * @typedef {(container: RegFormFillerDeps) => T} RegFormFillerThunk
 */

/** @type {(updateForm: (form: Address) => void, updateError: (error: AppError) => void) => RegFormFillerThunk<Promise<void>>} */
export const fillRegFormWithCurrentAddress =
  (updateForm, updateError) =>
    ({ currentAddressProvider }) =>
      currentAddressProvider.getCurrentAddress().then(updateForm, updateError);
