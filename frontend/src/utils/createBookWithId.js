import { v4 as uuidv4 } from "uuid";

const createBookWithId = (book) => {
  return {
    ...book,
    isFavorite: false,
    id: uuidv4(),
    year: book.year ? book.year : Math.floor(Math.random()*2024)
  };
};

export default createBookWithId;
