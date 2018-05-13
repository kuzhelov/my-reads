import React from "react";

// authors: string
// title: string
// cover: {
//	url: string,
// 	height: number 
// }
// shelfId?: string
// onChange: (newShelfId: string) => void
export class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = { shelfId: this.props.shelfId };
    }

    handleChange(e) {
        this.props.onChange && this.props.onChange(e.target.value);
        this.setState({ shelfId: e.target.value });
    }

	render() {
		return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: this.props.cover.height, backgroundImage: `url("${this.props.cover.url}")` }}></div>
				<div className="book-shelf-changer">
					<select value={ this.state.shelfId || '' } onChange={ this.handleChange.bind(this) }>
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