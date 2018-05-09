import React from 'react'

// authors: string
// title: string
// cover: {
//	url: string,
// 	height: number 
// }
// shelfId?: string
// onChange: (newShelfId: string) => void
export class Book extends React.Component {
    handleChange(e) {
        this.props.onChange && this.props.onChange(e.target.value);
    }

	render() {
		return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: this.props.cover.height, backgroundImage: `url("${this.props.cover.url}")` }}></div>
				<div className="book-shelf-changer">
					<select defaultValue={ this.props.shelfId || '' } onChange={ this.handleChange.bind(this) }>
						<option value="moveTo" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{this.props.title}</div>
			<div className="book-authors">{this.props.authors}</div>
		</div>);
	}
}

// title: string
// id: string
// books: BookModel[]
// onChange: (book: Book, newShelfId: string) => void
class Bookshelf extends React.Component {
	render() {
		return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{this.props.title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{this.props.books.map(book => (
						<li key={book.title}>
							<Book 
								title={book.title}
								authors={book.authors}
                                cover={book.cover}
                                shelfId={this.props.id} 
                                onChange={ (newShelfId) => this.props.onChange(book, newShelfId) } />
						</li>)) 
					}
				</ol>
			</div>
		</div>);
	}
}

// title: string
// shelves: { 
//	title: string,
//	id: string,	
//  books: []
// }
// moveBook: (book: Book, newShelfId: string) => void
export class ListBooks extends React.Component {
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>{this.props.title}</h1>
				</div>
				<div className="list-books-content">
					<div>      
						{Object.keys(this.props.shelves).map(id => {
                            const shelf = this.props.shelves[id];
                            return (
                                <Bookshelf 
                                    key={id} 
                                    title={shelf.title} 
                                    id={id}
                                    books={shelf.books}
                                    onChange={ (book, newShelfId) => { this.props.moveBook(book, newShelfId); } } />
                            )}
                        )}
					</div>
				</div>
				
				{ this.props.children }
				
			</div>);
	}
}