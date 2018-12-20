import React from 'react'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'
import {TransactionService} from './../../services/TransactionService'

let PromoCode = React.createClass({

	propTypes: {
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{transactions}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{promoCode: string}}
	 */
	refreshLocalState(){
		let transaction = CashierStore.getTransaction();
		let promoCode = transaction.promoCode;
		return {
			promoCode: promoCode
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * Set transaction transaction promoCode in the store
	 *
	 * @param event
	 */
	changeValue(event){
		let promoCode = event.currentTarget.value;
		TransactionService.setPromoCode(promoCode);
	},

	render(){
		return (
			<div id="promoCodeController">
				<label className="col-sm-4 control-label">{translate('TRANSACTION_PROMO_CODE', 'Promo code')}:</label>
				<div className="col-sm-8">
					<input className="form-control" type="text" autoComplete="off" id="promoCode" name="promoCode" onChange={this.changeValue} value={this.state.promoCode}/>
				</div>
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}

});

module.exports.PromoCode = PromoCode;
