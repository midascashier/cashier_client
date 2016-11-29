import React from 'react'
import {translate} from '../../constants/Translate'

let LoadingSpinner = React.createClass({
	render() {
		let processing = translate('PROCESSING_SPINNER', '...please wait!');
		return (
			<div className="loader" id="loadingSpinner">
			</div>
		)
	}
});

module.exports.LoadingSpinner = LoadingSpinner;