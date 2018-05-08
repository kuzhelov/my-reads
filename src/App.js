import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css'

import { SearchBooks, OpenSearchButton } from './components/search';
import { ListBooks } from './components/books';

import Shelves, { moveBook } from './stores/books';

class BooksApp extends React.Component {
	state = {
		shelves: Shelves
	}

	moveBook(book, shelfId) {
		this.setState({ shelves: moveBook(book, shelfId) });
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
