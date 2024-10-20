export const toSlug = (str) => {
  // if (typeof str !== 'string') {
  //   console.error('Invalid input for toSlug:', str);
  //   return '';
  // }

  return str
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w-]+/g, ''); // Remove non-word characters
};
