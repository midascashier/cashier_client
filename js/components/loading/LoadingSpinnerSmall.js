import React from 'react'
import {translate} from '../../constants/Translate'

let LoadingSpinnerSmall = React.createClass({
	render() {
		return (
			<div className="form-control loader-xs" id="loadingSpinnerSmall"></div>
		)
	}
});

module.exports.LoadingSpinnerSmall = LoadingSpinnerSmall;