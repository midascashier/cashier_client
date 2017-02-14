import React from 'react'
import { Steps } from './headerComponents/Steps'
import { Info } from './headerComponents/Info'

let Header = React.createClass({
	render() {
		return (
			<div id="header">
				TEST
				<Steps />
				<Info />
			</div>
		)
	}
});

module.exports.Header = Header;