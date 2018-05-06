import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { SearchBooks, OpenSearchButton } from './components/search';
import { Bookshelf } from './components/books';

import Books from './stores/books';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false
	}

	render() {
		return (
			<div className="app">
				{this.state.showSearchPage ? (
					<SearchBooks closeSearch={() => this.setState({ showSearchPage: false })} />
				) : (
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<div className="list-books-content">
								<div>
									<Bookshelf title="Currently Reading" books={Books.currentlyReading} />
									<Bookshelf title="Want to Read" books={Books.wantToRead} />
									
									<Bookshelf title="Read" books={Books.read} />
								</div>
							</div>

							<OpenSearchButton openSearch={() => this.setState({ showSearchPage: true })} />
						</div>
					)}
			</div>
		)
	}
}

export default BooksApp
