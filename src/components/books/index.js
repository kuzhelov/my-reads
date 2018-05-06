import React from 'react'

// authors: string
// title: string
// cover: {
//	url: string,
// 	height: number 
// }
// 
class Book extends React.Component {
	render() {
		return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: this.props.cover.height, backgroundImage: `url("${this.props.cover.url}")` }}></div>
				<div className="book-shelf-changer">
					<select>
						<option value="none" disabled>Move to...</option>
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
// books: BookModel[]
export class Bookshelf extends React.Component {
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
								cover={book.cover} />
						</li>)) 
					}
				</ol>
			</div>
		</div>);
	}
}
