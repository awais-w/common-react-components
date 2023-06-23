function formatAddress({ city, country, county, line1, line2, line3, postcode }) {
  const appendComma = (field) => (field ? `${field}, ` : '');
  const preppendComma = (field) => (field ? `, ${field}` : '');
  const formatedLine1 = appendComma(line1);
  const formatedLine2 = appendComma(line2);
  const formatedLine3 = appendComma(line3);
  const formatedCountry = preppendComma(country);
  const formatedCounty = preppendComma(county);
  const formatedPostcode = postcode ? ` ${postcode}` : '';
  const formatedCity = city || '';
  const template = `${formatedLine1}${formatedLine2}${formatedLine3}${formatedCity}${formatedPostcode}${formatedCounty}${formatedCountry}`;
  const result = template
    .replace(/,[,]+/, ',') // remove consecutive commas
    .replace(/,\s*$/, ''); // remove trailing whitechars and commas
  return result;
}

export default formatAddress;
