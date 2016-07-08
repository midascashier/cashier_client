import React from 'react'
import { Header } from './Header'

let DepositContent = React.createClass({

	/**
	 * Check full set of limits
	 *
	 * @returns {number}
	 */
	checkLimitsFull(amount){
		return 1;
	},

	/**
	 * Check mix and Max limits
	 *
	 * @returns {number}
	 */
	checkLimitsLite(amount, min, max){
		if (min < amount && amount < max){
			return 1;
		}else{
			return 0;
		}
	},

	render() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				checkLimitsFull: this.checkLimitsFull,
				checkLimitsLite: this.checkLimitsLite
			})
		);

		return (
			<div id="depositContent">
				<Header test={this.test}/>
				<div id="internal-content" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="row">
									{childrenWithProps}
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