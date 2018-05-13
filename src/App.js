import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css'

import { getAll, update } from './BooksAPI';

import { SearchBooks, OpenSearchButton } from './components/search';
import { ListBooks } from './components/books';

import Shelves, { moveBook, convertToBook } from './stores/books';

class BooksApp extends React.Component {
	state = {
		shelves: Shelves
	}

	constructor(props) {
		super(props);

		// blocking move book requests processing until shelves are initialized
		this.currentMoveBookPromise = null;
	}

	componentDidMount() {
		getAll().then(booksResponse => {
			booksResponse.forEach(bookJson => {
				const book = convertToBook(bookJson, bookJson.shelf)
		
				Shelves[bookJson.shelf].books.push(book);
			});

			this.setState({ shelves: Shelves});

			// allowing move book requests processing
			this.currentMoveBookPromise = Promise.resolve();
		});
	}

	moveBook(book, shelfId) {
		// here we are at the point when intialization logic is not finished yet
		if (!this.currentMoveBookPromise) { return; } 

		// this promise is used to avoid races
		this.currentMoveBookPromise = this.currentMoveBookPromise
			.then(() => {
				this.setState({ shelves: moveBook(book, shelfId) });

				const originalShelfId = book.shelfId;
				return update(book, shelfId)
					.catch(err => {
						// update has failed on server - return app to the original state
						this.setState({ shelves: moveBook(book, originalShelfId) });
					});
			});
	} 

	render() {
		return (
			<BrowserRouter>
				<div className="app">			
					<Route exact path="/search" render={() => (
						<SearchBooks moveBook={ (book, newShelf) => this.moveBook(book, newShelf) } />
					)} />

					<Route exact path="/" render={() => (
						<ListBooks 
							title="MyReads" 
							shelves={this.state.shelves}
							moveBook={ (book, newShelf) =>  this.moveBook(book, newShelf) }>		

							<OpenSearchButton />
						</ListBooks>)} />
				</div>
			</BrowserRouter>
		)
	}
}

export default BooksApp
