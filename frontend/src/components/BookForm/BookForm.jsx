import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";
import { addBook } from "../../redux/slices/booksSlice.js";
import booksData from "../../data/books.json";
import "./BookForm.css";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithId(randomBook, 'random');

    dispatch(addBook(randomBookWithId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createBookWithId({
        title: title,
        author: author,
      }, 'manual');

      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      const res = await axios.get("http://localhost:4000/random-book");
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data, 'API')));
      }
    } catch (error) {
      console.log('Error server connection', error);
    }
  };

  return (
    <div className='app-block book-form'>
      <h2>Add a New Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type='submit'>Add Book</button>
        <button type='button' onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type='button' onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  );
}

export default BookForm;
