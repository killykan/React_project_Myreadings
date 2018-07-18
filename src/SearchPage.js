import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import './App.css'
                      /****Component to our search page****/

class SearchPage extends Component {

  /*set States to hold the search result in an array, and the value of the input*/

  state = {
  listResult:[],
  query: ''
  }

  /*method applied when a change occurs in the input field*/

  research = (evt) => {
    const query = evt.target.value.trim()
    this.setState({query:query})
    if(query){
      BooksAPI.search(query,30).then(result => {
        if(result.length>0){
          this.setState({listResult: result})
          console.log(this.state.listResult)
        } else {
          this.setState({listResult: []})
        }})
      } else this.setState({listResult: []})
  }


  render() {
    const {query, listResult} = this.state
    const {books, updateShelf} = this.props

    return(

      <div className="search-books">

          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
              <div className="search-books-input-wrapper">
                 <input
                   type="text"
                   value={query}
                   placeholder="Search a Book"
                   onChange={this.research}
                 />
              </div>
          </div>

          <div className="search-books-results">
              {listResult.length>0 && (
                <div>
                  <h2>Here is the result of your search</h2>
                  <ol className="books-grid">
                    {listResult.map((book) => (
                      <BookList
                      book={book}
                      books={books}
                      key={book.id}
                      updateShelf={updateShelf}/>
                    ))}
                  </ol>
                </div>

              )}
          </div>
        </div>
    )
  }
}

export default SearchPage
