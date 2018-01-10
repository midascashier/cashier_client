import React from 'react'

let Client = React.createClass({
	/**
	 * Showing in this container the component selected and the components or methods of the children at any point in the rendering time
	 */
	render(){
		return (
			<div id="main">
				<div id="mainContent" className="global">
					<div id="client" className="container">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
});

module.exports.Client = Client;