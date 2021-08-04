import { Monthes } from '../config';

const makeDate = (md: string) => {
  const date = new Date(md);
  return `${Monthes[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default makeDate;
