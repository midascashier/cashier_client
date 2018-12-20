import React from 'react'

let LoadingSpinner = React.createClass({
	render(){
		return (
			<div className="loader" id="loadingSpinner">
			</div>
		)
	}
});

module.exports.LoadingSpinner = LoadingSpinner;