import React from 'react'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'

let Cryptotransfer = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		btcAmount: React.PropTypes.node,
		changeValue: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,

		rate: React.PropTypes.number,
		limitsCheck: React.PropTypes.string,
		cryptoAmount: React.PropTypes.node,
		setCryptoAmount: React.PropTypes.func,

		allowContinueToConfirm: React.PropTypes.func
	},

	render() {
		return (
			<div id="crypto">
				<div className="col-sm-6">
					<AskInfo
						setAmount={this.props.setAmount}
						btcAmount={this.props.btcAmount}
						changeValue={this.changeValue}
						setBTCAmount={this.props.setBTCAmount}

						rate={this.props.rate}
						limitsCheck={this.props.limitsCheck}
						cryptoAmount={this.props.cryptoAmount}

						allowContinueToConfirm={this.props.allowContinueToConfirm}
					/>
				</div>

				<div className="col-sm-6">
					<InfoMethod
						amount={this.props.amount}
						limitsCheck={this.props.limitsCheck}
						allowContinueToConfirm={this.props.allowContinueToConfirm}
					/>
				</div>
			</div>
		)
	}
});

module.exports.Cryptotransfer = Cryptotransfer;