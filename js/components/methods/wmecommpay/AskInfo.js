import React from 'react'
import {translate} from '../../../constants/Translate'
import {CustomerService} from '../../../services/CustomerService'
import {AmountController} from '../../commonComponents/AmountController'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.node,
		promoCode: React.PropTypes.string,
		setPromoCode: React.PropTypes.func
	},

	componentWillMount(){
		this.state = {
			errorMessage: null
		}
	},

	/**
	 * Pass props on to son
	 *
	 * @returns {*}
	 */
	getProps(){
		return this.props
	},

	render(){
		let amount = this.props.amount;
		let setAmount = this.props.setAmount;
		let limitsCheck = this.props.limitsCheck;
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');

		return (
			<div id="wmEcommPayAskInfo" className="box">
				<div className="row">
					<div className="title">{proccesingTitle}</div>
					<div className="infoCol">
						<div className="col-sm-12">
							<div className="form-horizontal">
								<div>
									{((() => {
										return (
												<div className="form-group">
													<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
												</div>
										);
									})())}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AskInfo = AskInfo;
