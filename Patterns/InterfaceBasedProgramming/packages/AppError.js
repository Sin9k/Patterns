/** @type {(code: string, message: string) => import("./domain").AppError} */
const AppError = (code, message) => ({ code, message });

export default AppError;
