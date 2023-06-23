/**
 * isObjectEmpty does a quick check to see if an object or array is empty
 * @param {object} obj object to test
 * @return {bool}
 * @example
 * const myObj = { someValue: "123" };
 * isObjectEmpty(myObj) // false
 */
export default function isObjectEmpty(obj) {
  return (
    // deliberate use of double-equals to catch undefined.
    obj == null ||
    (Object.keys(obj).length === 0 &&
      (JSON.stringify(obj) === JSON.stringify({}) || JSON.stringify(obj) === JSON.stringify([])))
  );
}
