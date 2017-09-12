import React from 'react'
import {translate} from '../constants/Translate'
import {TransactionService} from './../services/TransactionService'

let PromoCode = React.createClass({

	propTypes: {
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	/**
	 * Set transaction transaction promoCode in the store
	 *
	 * @param event
	 */
	changeValue(event) {
		let promoCode = event.currentTarget.value;
		this.props.setPromoCode(promoCode);
		TransactionService.setPromoCode(promoCode);
	},

	render() {
		return (
			<div id="promoCodeController">
				<label className="col-sm-4 control-label">{translate('TRANSACTION_PROMO_CODE', 'Promo code')}:</label>
				<div className="col-sm-8">
					<input className="form-control" type="text" autoComplete="off" id="promoCode" name="promoCode" onChange={this.changeValue} value={this.props.promoCode}/>
				</div>
			</div>
		)
	}
});

module.exports.PromoCode = PromoCode;
