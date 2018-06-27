/**
 * Created by armandoc on 6/22/2018.
 */
import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {CustomerService} from '../../../services/CustomerService'
import {CreditCardRegister} from './CreditCardRegister'
import {ApplicationService} from '../../../services/ApplicationService'
import {TransactionService} from '../../../services/TransactionService'
import {Input} from '../../commonComponents/Inputs'

let CreditCard = React.createClass({

	getInitialState(){
		CustomerService.getCustomerPayAccounts();
		return this.parameters();
	},

	parameters(){
		let registerCC = (this.state === null) ? false : this.state.showRegisterCC;

		return {
			cards: CashierStore.getCustomerPayAccounts(),
			buyCryptos: {
				payAccountId: 0,
				amount: '',
				cryptoCurrencyCode: 'BTC'
			},
			showRegisterCC: registerCC
		}
	},

	validCC(event){
		let value = parseInt(event.target.value);
		this.state.buyCryptos.payAccountId = value;
		let status = (value == 0);
		this.setState({showRegisterCC: status});
	},

	returnFromRegisterNewCC(){
		this.getInitialState();
		this.setState({showRegisterCC: false});
	},

	_onChange(){
		this.setState(this.parameters);
	},

	buyCryptos(e){
		if(!ApplicationService.emptyInput(e)){

			let payAccountId = e.target.querySelector('[name="payAccountId"]').value;
			let amount = e.target.querySelector('[name="amount"]').value;
			let cryptoCurrencyCode = 'BTC';

			TransactionService.buyCryptos(payAccountId, amount, cryptoCurrencyCode);

			let buyCryptos = {
				payAccountId: payAccountId,
				amount: amount,
				cryptoCurrencyCode: cryptoCurrencyCode
			};

			this.setState({buyCryptos: buyCryptos});
		}
	},

	render() {

		let cards = this.state.cards;

		let options = [];

		if(0 < cards.length){
			for(let i in cards){
				let card = cards[i];
				let payAccountId = card.caPayAccount_Id;
				if(0 < this.state.buyCryptos.payAccountId){
					if(payAccountId == this.state.buyCryptos.payAccountId){
						options.push(<option selected="selected" key={payAccountId} value={payAccountId}>{card.Last4}</option>);
					}else{
						options.push(<option key={payAccountId} value={payAccountId}>{card.Last4}</option>);
					}
				}else{
					options.push(<option selected="selected" key={payAccountId} value={payAccountId}>{card.Last4}</option>);
				}
			}
			options.push(<option key={"0"} value={"0"}>{"Add new cc"}</option>);
		}

		const componentDeposit = (
			<div className="box">
				<div className="row">
					<div className="col-sm-11">
						<div className="title">Buy criptos</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">

										<form onSubmit={this.buyCryptos}>
											<div className="form-group">
												<label className="control-label col-sm-4">Select Credit Card</label>
												<div className="col-sm-6">
													<select
														onChange={this.validCC}
														name="payAccountId"
														id="payAccountId"
														data-isRequired
														className="form-control">{options}</select>
												</div>
											</div>

											<div className="form-group">
												<label className="control-label col-sm-4">Amount</label>
												<div className="col-sm-6">

													<Input
														type="number"
														id="amount"
														name="amount"
														ref="amount"
														validate="isNumber"
														require
													/>

												</div>
											</div>
											<div className="form-group">
												<div className="col-sm-offset-4 col-sm-8">
													<button type="submit" className="btn btn-primary btn-sm">Deposit</button>
												</div>
											</div>
										</form>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);

		const componentRegisterCC = (
			<div id="visaAskInfo" className="box">
				<div className="row">
					<div className="col-sm-11">
						<div className="title">Register credit card</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">
										<CreditCardRegister returnFromRegisterNewCC={this.returnFromRegisterNewCC}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

		return (!this.state.showRegisterCC ? componentDeposit : componentRegisterCC);
	},

	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	}

});

module.exports.CreditCard = CreditCard;