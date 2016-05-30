import React from 'react'
import {Methods} from './contentComponents/methods'
import {MethodInfo} from './contentComponents/methodInfo'

let Content = React.createClass({
	render() {
		return (
			<div id="content">
				<Methods />
				<MethodInfo />
			</div>
		)
	}
});

module.exports.Content = Content;