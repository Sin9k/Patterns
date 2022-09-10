import React, { useMemo } from "react";
import { fillRegFormWithCurrentAddress } from "../use-cases/fill-registration-form-with-current-address";
import { useRun } from "./container-react-binding";

const updateField = fieldName => value => form => ({ ...form, [fieldName]: value });

const RegistrationForm = () => {
  const [form, updateForm] = React.useState({});
  const [error, updateError] = React.useState(null);

  const run = useRun();

  const fillFormWithCurrentAddr = useMemo(
    () => run(fillRegFormWithCurrentAddress(updateForm, updateError)),
    [updateForm, updateError]
  );

  return (
    <form onSubmit={event => event.preventDefault()}>
      {error && <ErrorAlert {...error} />}
      <div>
        <label for="postalCode">postalCode:</label>
        <input name="postalCode" onChange={updateForm(updateField("postalCode"))} value={form.postalCode} />
      </div>

      <div>
        <label for="country">country:</label>
        <input name="country" onChange={updateForm(updateField("country"))} value={form.country} />
      </div>
      
      <div>
        <label for="city">city:</label>
        <input name="city" onChange={updateForm(updateField("city"))} value={form.city} />
      </div>

      <div>
        <label for="streetName">streetName:</label>
        <input name="streetName" onChange={updateForm(updateField("streetName"))} value={form.streetName} />
      </div>
      
      <div>
        <label for="houseNumber">houseNumber:</label>
        <input name="houseNumber" onChange={updateForm(updateField("houseNumber"))} value={form.houseNumber} />
      </div>
      
      <hr/>

      <button type="button" onClick={fillFormWithCurrentAddr}>Fill With Current Address</button>

      <hr/>

      <button type="submit">Submit</button>
    </form>
  )
}

export default RegistrationForm;