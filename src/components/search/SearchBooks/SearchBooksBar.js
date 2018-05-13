import React from 'react';

import * as _ from 'underscore';

import { Link } from 'react-router-dom'

import { search } from '../../../BooksAPI';
import { convertToBook } from '../../../stores/books';

// onChange: () => void
// getShelfOfBook: (book) => shelfId: string
export class SearchBooksBar extends React.Component {
	constructor(props) {
		super(props);

		this.lastSearchTime = new Date();

		this.getShelfOfBook = this.props.getShelfOfBook || (() => 'none');
	}

	handleChange = _.debounce((e) => {
		const searchTerm = e.target.value;
		this.lastSearchTime = new Date();

		if (!searchTerm) { this.updateBooks([]); return; }

		search(searchTerm)
			.then(books => {
				if (!books || books.error) { return; }

				this.updateBooks(books.map(book => {
					return convertToBook(book, this.getShelfOfBook(book));
				}));
			})
			.catch(error => { this.updateBooks([]); })
	}, 500);

	componentWillUnmount() {
		// to prevent async execution on unmounted component
		this.handleChange.cancel();
	}

	updateBooks(books) {
		const currentUpdateTime = new Date();
		if (currentUpdateTime < this.lastSearchTime) { return; }

		this.props.onChange && this.props.onChange(books);
	}

	render() {
		return (<div className="search-books-bar">
		<Link className="close-search" to="/">Close</Link>
		<div className="search-books-input-wrapper">
			{/*
NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
you don't find a specific author or title. Every search is limited by search terms.
*/}
			<input type="text"
				placeholder="Search by title or author"
				onChange={ (e) => { e.persist(); this.handleChange(e) }} />
		</div>
	</div>);
	}
}