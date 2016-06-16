import React from 'react'

let LoadingSpinner = React.createClass({
	render() {
		return (
			<span id="loader-sm" className="loader-sm"></span>
		)
	}
});

module.exports.LoadingSpinner = LoadingSpinner;