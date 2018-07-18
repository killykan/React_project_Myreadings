import React, {Component} from 'react';
import BookShelf from './BookShelf'
import './App.css'
            /*****My Shelf Component*****/
      /*renders our books in their respective shelves*/

class MyShelf extends Component {

  render() {
    const {books, updateShelf, shelfCat} = this.props

    return (

        <div className="list-books-content">
          {/*we loop over the shelfCat object to set books based on their category*/}
          {shelfCat.map((shelf, num) => {
            const bShelf = books.filter( book => book.shelf === shelf.type)
            return(
              <div className="bookshelf" key={num}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <BookShelf
                    books={bShelf}
                    updateShelf={updateShelf}
                  />
                </div>
              </div>)
            })}
        </div>
      )
  }
}




export default MyShelf
