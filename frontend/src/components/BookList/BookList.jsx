import { useSelector } from "react-redux";
import "./BookList.css";

function BookList() {
  const books = useSelector((state) => state.books);
  console.log(books)
  console.log(books.lenght === 0)
  return (
    <div className='app-block book-list'>
      <h2>BookList</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, index) => 
            <li key={book.id}>
              <div className='book-info'>
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default BookList;
