/**\
 * @description Formatting String with Special character in lowercase
 * @example Validation @rejects-before !sending $to cb --> validation-rejects-before-sending-to-cb
 */
export const getStringWithSpclChar = (str: String, char: string) => {
  if (typeof str === "number") return "";

  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, char);
};
