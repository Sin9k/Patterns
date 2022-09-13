/** @typedef {{ code: string, message: string }} ErrorAlertProps */
/** @type {(props: ErrorAlertProps) => JSX.Element} */
const ErrorAlert = ({ code, message }) => (
  <div>
    <h1>{code}</h1>
    <hr />
    <p>{message}</p>
  </div>
);

export default ErrorAlert;
