import React from 'react'
import {Input} from '../../commonComponents/Inputs'
import {translate} from '../../../constants/Translate'
import {AmountController} from '../../commonComponents/AmountController'
import {FeeController} from '../../commonComponents/FeeController'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'

let AskInfo = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,

		account: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,

		accountChange: React.PropTypes.func,
		invalidAccount: React.PropTypes.bool
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{customer, links: string[]}}
	 */
	getInitialState(){
		return {
			customer: CashierStore.getCustomer(),
			links: []
		};
	},

	render(){
		let {setAmount, limitsCheck, account, feeCheck, feeCashValue, amount} = this.props;
		const title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		const {links} = this.state;

		let validations = {
			AGENT_TRANSFER_INVALID_USER_ACCOUNT: this.props.invalidAccount
		};

		const accountField = this.state.customer.personalInformation.isAgent == "1"
			? <Input type="text" customValidations={validations} id="account" name="account" ref="account" value={account} onChange={this.props.accountChange}/>
			: <select className="form-control" id="account" name="account" ref="account" onChange={this.props.accountChange}>
				{links.map(link => <option key={link} value={link}>{link}</option>)}
			</select>

		return (
			<div id="btcAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('AGENT_TRANSFER_USER_ACCOUNT', 'User account')}:</label>
											<div className="col-sm-8">
												{accountField}
											</div>
										</div>

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										<div className="form-group">
											<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	},

	/**
	 * React function to load transfer links once component has been created
	 */
	componentDidMount(){
		TransactionService.getTransferLinks()
			.then(values =>{
				this.setState({
					links: values.map(link => link['Username_To'])
				});
				this.props.accountChange(values[0]['Username_To']);
			})
	}
});

module.exports.AskInfo = AskInfo;