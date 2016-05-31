import React from 'react'
import {Header} from './header'
import {Content} from './content'

let Client = React.createClass({
	render() {
		return (
			<div id="main" className="global">
				<div id="container" className="container">
          <div id="content" className="deposit-method">
            <Header />
            <Content />
          </div>
				</div>
			</div>
		)
	}
});

module.exports.Client = Client;