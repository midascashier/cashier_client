import React from 'react'
import {Methods} from './contentComponents/methods'

let DepositContent = React.createClass({
	render() {
		return (
			<div id="depositContent">
				<Methods />
			</div>
		)
	}
});

module.exports.DepositContent = DepositContent;