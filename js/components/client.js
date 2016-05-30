import React from 'react'
import {Header} from './header'
import {Content} from './content'

let Client = React.createClass({
	render() {
		return (
			<div id="main">
				<Header />
				<Content />
			</div>
		)
	}
});

module.exports.Client = Client;