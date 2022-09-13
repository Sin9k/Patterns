/**
 * @type {<Params extends {}>(params: Params) => string} */
export const buildQuery = (params) => Object
  .keys(params)
  .map((param) => `${param}=${encodeURIComponent(`${params[/** @type {keyof typeof params} */ (param)]}`)}`)
  .join('&');
