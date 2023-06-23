import isObjectEmpty from '../isObjectEmpty';
/**
 * isEmpty does a quick check to see if the received parameter is empty
 * @param {object, string} obj object to test
 * @return {bool}
 * @example
 * const myObj = { someValue: "123" };
 * isEmpty(myObj) // false
 * const myStr = "123";
 * isEmpty(myStr) // false
 */
export default function isEmpty(input) {
  if (input == null) return true;
  const typeOfIn = typeof input;
  if (typeOfIn === 'undefined') return true;
  switch (typeOfIn.toLowerCase()) {
    case 'object':
      return isObjectEmpty(input);
    case 'string':
      return input == null || input.trim() === '';
    case 'number':
    case 'boolean':
      return false; // an actual number or boolean is never empty.
    default:
      throw new Error("Not able to tell if it's empty or not");
  }
}
