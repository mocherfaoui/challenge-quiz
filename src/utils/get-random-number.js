export const getRandomEvenNumber = (low, high) => {
  const randomNumber = Math.floor(Math.random() * (high - low + 1) + low);
  return low + 2 * Math.floor((randomNumber - low) / 2);
};
