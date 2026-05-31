export const fullNameToFirstNameAndLastName = (name: string = '') => {
  const parts = name.trim().split(' ');

  const firstName = parts[0] || '';

  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';

  return {
    firstName,
    lastName,
  };
};
