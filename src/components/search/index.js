import React from 'react'

// closeSearch: () => void
export class SearchBooks extends React.Component {
	render() {
		return (
		<div className="search-books">
			<SearchBooksBar 
				closeSearch={ this.props.closeSearch } />

			<SearchBooksResults />
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
class SearchBooksBar extends React.Component {
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
			<input type="text" placeholder="Search by title or author" />
		</div>
	</div>);
	}
}

class SearchBooksResults extends React.Component {
	render() {
		return (
			<div className="search-books-results">
				<ol className="books-grid"></ol>
			</div>);
	}
}