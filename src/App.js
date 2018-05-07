import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { SearchBooks, OpenSearchButton } from './components/search';
import { ListBooks } from './components/books';

import Shelves, { moveBook } from './stores/books';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		shelves: Shelves
	}

	moveBook(book, shelfId) {
		this.setState({ shelves: moveBook(book, shelfId) });
	} 

	render() {
		return (
			<div className="app">
				{this.state.showSearchPage ? (
					<SearchBooks 
						closeSearch={() => this.setState({ showSearchPage: false })}
						moveBook={ (book, newShelf) => this.moveBook(book, newShelf) } />
				) : ( 
					<ListBooks 
						title="MyReads" 
						shelves={this.state.shelves}
						moveBook={ (book, newShelf) =>  this.moveBook(book, newShelf) }>		

						<OpenSearchButton openSearch={ () => this.setState({ showSearchPage: true }) } />
					</ListBooks>	
				)}
			</div>
		)
	}
}

export default BooksApp
