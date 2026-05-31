export const generateDefaultUserName = (name: string) => {
  
  const sanitizedName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

  const baseName = sanitizedName.length >= 3 ? sanitizedName : 'user';

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  //returning something like name2315 or yourname4343
  const finalname = baseName.concat(randomNumber.toString());

  return finalname;
};
