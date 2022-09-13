import React from 'react';
import { fillRegFormWithCurrentAddress } from './fill-registration-form-with-current-address';
import { useRun } from '../container/container-react-binding';
import ErrorAlert from '../ErrorAlert';

/** @typedef {import('../../packages/domain').Address} Address */
/** @typedef {import('../../packages/domain').AppError} AppError */

/**
 * @template S;
 * @typedef {<S>(state: S) => S} Reducer */

/** @type {Address} */
const initialForm = {
  postalCode: '',
  country: '',
  city: '',
  streetName: '',
  houseNumber: '',
};

/** @type {
  <F extends { [x: string]: any }>(fieldName: string, updateForm: (reducer: Reducer<F> | F) => void) =>
  (event: React.ChangeEvent<HTMLInputElement>) => void
} */
const updateField = (fieldName, updateForm) => ({ target }) => updateForm(
  form => ({ ...form, [fieldName]: target.value }),
);

const RegistrationForm = () => {
  const [form, updateForm] = React.useState(initialForm);
  const [error, updateError] = React.useState(/** @type {AppError | null} */ (null));

  const run = useRun();

  const fillFormWithCurrentAddr = React.useCallback(
    () => run(fillRegFormWithCurrentAddress(
      address => updateForm({ ...initialForm, ...address }),
      updateError,
    )),
    [updateForm, updateError],
  );

  return (
    <form onSubmit={event => event.preventDefault()}>
      {error && <ErrorAlert {...error} />}
      <div>
        <label htmlFor="postalCode">postalCode:</label>
        <input id="postalCode" onChange={updateField('postalCode', updateForm)} value={form.postalCode} />
      </div>

      <div>
        <label htmlFor="country">country:</label>
        <input id="country" onChange={updateField('country', updateForm)} value={form.country} />
      </div>

      <div>
        <label htmlFor="city">city:</label>
        <input id="city" onChange={updateField('city', updateForm)} value={form.city} />
      </div>

      <div>
        <label htmlFor="streetName">streetName:</label>
        <input id="streetName" onChange={updateField('streetName', updateForm)} value={form.streetName} />
      </div>

      <div>
        <label htmlFor="houseNumber">houseNumber:</label>
        <input id="houseNumber" onChange={updateField('houseNumber', updateForm)} value={form.houseNumber} />
      </div>

      <hr/>

      <button type="button" onClick={fillFormWithCurrentAddr}>Fill With Current Address</button>

      <hr/>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
