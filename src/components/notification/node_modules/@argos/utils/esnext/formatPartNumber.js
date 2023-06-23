const formatPartNumber = (partNumber = '') => {
  const sku = partNumber.toString()
  if (/^\d{7}$/g.test(sku)) {
    return `${sku.substr(0, 3)}/${sku.substr(3)}`
  }
  return sku
}

export default formatPartNumber
