function formatName({ title, name, surname, middleName }) {
  if (!name && !surname) throw new Error('Name or Surname is required');
  const formattedTitle = title ? `${title} ` : '';
  const formattedName = name ? `${name} ` : '';
  const formattedMiddleName = middleName ? `${middleName} ` : '';
  return `${formattedTitle}${formattedName}${formattedMiddleName}${surname.toUpperCase()}`;
}

export default formatName;
