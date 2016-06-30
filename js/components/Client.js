import React from 'react'

let Client = React.createClass({
																 render() {
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