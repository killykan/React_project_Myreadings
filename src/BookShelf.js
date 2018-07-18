import React, {Component} from 'react';
import BookList from './BookList'
import './App.css'
class BookShelf extends Component {

  render(){
    const {books, updateShelf}= this.props

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <BookList
            book={book}
            books={books}
            key={book.id}
            updateShelf={updateShelf}
          />
        ))}
      </ol>
    )
  }

}
export default BookShelf
