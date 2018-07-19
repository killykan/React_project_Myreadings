import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import * as BooksAPI from './BooksAPI'
import MyShelf from './MyShelf';
import SearchPage from './SearchPage';
import './App.css'

                        /****Parent Component****/

class App extends Component {

/* set a state which contains an array of the books in "My Shelf"*/

  state = {
    books: [],
  }

        /* fetch a request to get all books from BooksAPI and change the state of books*/

  componentDidMount() {
    BooksAPI.getAll().then(response => {
    this.setState({books: response});
    console.log(this.state);
    })
  }

        /* Method to update shelves when moving a book*/

  updateShelf = (newBook, newShelf) => {
    BooksAPI.update(newBook, newShelf).then(response => {
    newBook.shelf = newShelf;
    let updatedList = this.state.books.filter(book => book.id !== newBook.id);
    updatedList.push(newBook);
    this.setState({books: updatedList});
    })
  }

  render() {
     const { books } = this.state;

     /* array to define the three main categories of shelves*/

     let shelfCat = [
                     { type: 'currentlyReading', title: 'My Current Readings...'},
                     { type: 'wantToRead',  title: 'I Want to Read...' },
                     { type: 'read', title: 'Read'}
                    ]
    return (
      <div className="app">

        {/*Route to our search page*/}

          <Route path="/Search" render={({history})=>(
              <SearchPage
                books={this.state.books}
                updateShelf={this.updateShelf}
              />
          )}/>

        {/*Route to the My Shelf page, sets to main page*/}

          <Route exact path="/" render={() => (
              <div className="list-books">
                  <div className="list-book-title">
                      <h1>My Shelf</h1>
                      <span data-tip data-for='tooltip' className="info">
                          <i className="far fa-question-circle fa-3x"></i>
                      </span>
                      <ReactTooltip id='tooltip' className='extraClass' delayHide={1000} effect='float' mutliline={true}>
                          <p>Click the arrow <br/> on book cover <br/> to manage your shelf!</p>
                      </ReactTooltip>
                  </div>

                  <MyShelf
                    shelfCat={shelfCat}
                    books={books}
                    updateShelf={this.updateShelf}
                  />

                  <div className="open-search">
                    <Link to="/Search">Add a book</Link>
                  </div>
                </div>
            )}/>

      </div>
    )
  }
}

export default App;
