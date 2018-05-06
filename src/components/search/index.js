import React from 'react'

import { Book } from '../books';
import { search } from '../../BooksAPI';

// closeSearch: () => void
export class SearchBooks extends React.Component {
	constructor(props) {
		super(props);

		this.state = { books: [] };
	}

	render() {
		return (
		<div className="search-books">
			<SearchBooksBar closeSearch={ this.props.closeSearch } onChange={ books => this.setState({ books: books }) } />
			<SearchBooksResults books={this.state.books} />
		</div>);
	}
}

// openSearch: () => void
export class OpenSearchButton extends React.Component {
    render() {
        return (
            <div className="open-search">
                <a onClick={ this.props.openSearch }>Add a book</a>
            </div>);
    }
}

// closeSearch: () => void
// onChange: () => void
class SearchBooksBar extends React.Component {
	constructor(props) {
		super(props);

		this.lastSearchTime = new Date();
	}

	handleChange(e) {
		const searchTerm = e.target.value;
		this.lastSearchTime = new Date();

		if (!searchTerm) { this.updateBooks([]); return; }

		search(searchTerm)
			.then(books => {
				if (!books || books.error) { return; }

				this.updateBooks(books.map(book => ({
					title: book.title,
					authors: book.authors && book.authors.join(', '),
					cover: {
						url: book.imageLinks.thumbnail,
						height: 190
					}
				})));
			});
	}

	updateBooks(books) {
		const currentUpdateTime = new Date();
		if (currentUpdateTime < this.lastSearchTime) { return; }

		this.props.onChange && this.props.onChange(books);
	}

	render() {
		return (<div className="search-books-bar">
		<a className="close-search" onClick={ () => this.props.closeSearch() }>Close</a>
		<div className="search-books-input-wrapper">
			{/*
NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
you don't find a specific author or title. Every search is limited by search terms.
*/}
			<input type="text" placeholder="Search by title or author" onChange={ this.handleChange.bind(this) } />
		</div>
	</div>);
	}
}

// books: Book[]
class SearchBooksResults extends React.Component {
	render() {
		return (
			<div className="search-books-results">
				<ol className="books-grid">
					{this.props.books.map((book, index) => (
						<Book key={index} 
							title={book.title} 
							authors={book.authors} 
							cover={book.cover} />
					))}
				</ol>
			</div>);
	}
}