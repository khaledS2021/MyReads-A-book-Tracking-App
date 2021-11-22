import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from './BooksAPI'
import propTypes from 'prop-types';

class BookSearch extends Component {

    state = {
        query: "",
        bookResults: [],

    }

    updateQuery = (query) => {
        this.setState({
            query: query,
            bookResults: [],
        })
        BooksAPI.search(query).then((searchResult) => {
            if (searchResult && searchResult.length > 0) {
                for (let b = 0; b < searchResult.length; b++) {
                    for (let i = 0; i < this.props.books.length; i++) {
                        if (searchResult[b].id === this.props.books[i].id) {
                            const bookInShelfIndex = this.props.books.findIndex((book) => book.id === searchResult[b].id)
                            searchResult[b].shelf = this.props.books[bookInShelfIndex].shelf

                        }
                    }
                }
            } this.setState({ bookResults: searchResult })
        })

    }
    render() {
        //ES6 estructuring 
        const { query, bookResults } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    {/**Using link in the react router dom  */}
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {bookResults && bookResults.length > 0 &&
                            bookResults.map((book) => (
                                <Book
                                    key={book.id}
                                    shelfChange={this.props.shelfChange}
                                    itemBook={book}
                                />
                            ))}
                    </ol>
                </div>
            </div>
        )
    }


}
//propTypes validations
BookSearch.propTypes = {
    books: propTypes.array.isRequired,
    shelfChange: propTypes.func.isRequired,
}


export default BookSearch