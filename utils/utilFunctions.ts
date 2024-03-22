const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* Function to generate a random number 
    with a normal distribution (Gaussian distribution) between 0 and 1
    for success percentage */
const normalRandom = () => {
  let val = 0;
  for (let i = 0; i < 6; i++) {
    val += Math.random();
  }
  return val / 6;
};

export { randomNumberInRange, normalRandom };