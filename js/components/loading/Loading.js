import React from 'react'
import {translate} from '../../constants/Translate'

let Loading = React.createClass({
	render(){
		return (
			<span id="loading">
				{translate('LOADING', 'Loading...')}
			</span>
		)
	}
});

module.exports.Loading = Loading;
