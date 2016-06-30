import React from 'react'
import {Header} from './Header'

let WithdrawContent = React.createClass({
	render() {
		return (
			<div id="withdrawContent">
				<Header />
				<div id="internal-content" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="row">
									{this.props.children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.WithdrawContent = WithdrawContent;