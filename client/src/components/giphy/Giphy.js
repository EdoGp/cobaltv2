import React from 'react';
import './giphy.css';

export default function Giphy(props) {
	return (
		<div className="giphy-container">
			<div className="giff-search">
				<input
					type="text"
					name="giff-search"
					placeholder="Search..."
					onChange={props.search}
				/>
			</div>
			<div className="giffs-container">
				{props.gifs}
			</div>
		</div>
	);
}
