import React,  {Component} from 'react';
import noImg from './icons/no-img.png';
import './App.css'
class BookList extends Component {

                          /***** Component to render our Book list *****/

  render() {

    const {book, books, updateShelf} = this.props

    const img = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noImg // if no image for cover, set the cover with custom image

    let actualShelf = 'none'
    for(let b of books){
      if(b.id === book.id){
        actualShelf = b.shelf
        break
      }
    }

      return(

        <li>
          <div className="book">
            <div className="book-top">
              <div  className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${img})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => updateShelf(book, e.target.value)}
                    defaultValue={actualShelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">Delete</option>
                  </select>
                </div>
            </div>

          <div className="book-title">{book.title}</div>
            {book.author && book.authors.map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
            ))}
          </div>
        </li>
      )
    }
  }

export default BookList
