import React from 'react'
import {Header} from './Header'

let DepositContent = React.createClass({
	render() {
		return (
			<div id="depositContent">
				<Header />
				<div id="internal-content" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="row">
									<div id="main">
										<div id="mainContent" className="global">
											{this.props.children}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.DepositContent = DepositContent;