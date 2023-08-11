/**
 * @description Get formatted Object
 *
 * @param {Object} formData
 *
 * @returns {Object} newFormattedParams
 */
export const getFormattedParams = (formData: any) => {
  const formattedParams = Object.entries(formData).map((entries) =>
    entries.map((entry) => (entry ? entry : null))
  );

  const newFormattedParams = Object.fromEntries(formattedParams);
  return newFormattedParams;
};

/**
 * @description Getting formatted payload to query params
 *
 * @param {Object} payload
 *
 * @returns {String} query
 */
export const getFormattedQueryParams = (payload: object) => {
  let query: string | boolean | any = "";

  Object.entries(payload).map(([key, value]) => {
    if (!value) return;

    query = `${query}${key}=${value}&`;
    return query;
  });
  query = query.endsWith("&") ? query.slice(0, -1) : query;
  return query;
};

/**
 * @description
 *
 * @param {string[] | number[]} arrayOfString
 * @returns
 */
export const getFormattedQueryParamsInString = (
  query: string,
  arrayOfString: number[] | string[]
) => {
  const paymentIDsString: string = arrayOfString.join();

  return `${query}=${paymentIDsString}`;
};

/**
 * @description Get formatted parameter with selected payment IDs
 *
 * @param {Object} parameter
 * @param {String} string
 * @param {array of number} paymentIDs
 *
 * @returns {string} query
 */
export const getFormattedParamsWithIDs = ({
  params,
  string,
  paymentIDs,
}: {
  params: object;
  string: string;
  paymentIDs: number[];
}) => {
  let query: string | boolean | any = "";

  Object.entries(params).map(([key, value]) => {
    if (!value) return;

    query = `${query}${key}=${value}&`;
    return query;
  });

  const paymentIDsString: string = paymentIDs.join();

  query = `${
    query.endsWith("&") ? query.slice(0, -1) : query
  }&${string}=${paymentIDsString}`;

  return query;
};
