import React from 'react'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import  errorMsgs  from '../../../constants/limitsErrorMsgs'

let Amount = React.createClass({

    propTypes: {
        rate: React.PropTypes.number,
        cryptoAmount: React.PropTypes.node,
        limitsCheck: React.PropTypes.string,
        customerAmount: React.PropTypes.node,
        setCryptoAmount: React.PropTypes.func,
        setCustomerAmount: React.PropTypes.func
    },

    crytoCurrencyCalculate(event) {
        let customerAmount = parseFloat(event.target.value);
        let btcAmount = customerAmount * parseFloat(CashierStore.getBTCRate()).toFixed(8);
        this.props.setCryptoAmount(btcAmount, customerAmount);
    },

    customerAmountCalculate(event) {
        let cryptoAmount = parseFloat(event.target.value);
        let btcAmount = cryptoAmount * parseFloat(this.props.rate).toFixed(8);
        this.props.setCustomerAmount(btcAmount, cryptoAmount);
    },

    render() {

        let action;
        let limitsErrorMsg;
        let limitsOK = false;

        let isWithDraw = UIService.getIsWithDraw();

        if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS || this.props.limitsCheck == Cashier.LOADING){
            limitsOK = true;
        }else{
            limitsErrorMsg = errorMsgs.limitsMsgs[this.props.limitsCheck];
        }

        if (isWithDraw){
            action = translate('WITHDRAW');
        }else{
            action = translate('DEPOSIT');
        }

        let placeHolderTXT = action + ' ' + translate('PROCESSING_AMOUNT', 'Amount');
        return (
            <div id="cryptoAmount">
                <div id="cryptoLimits"></div>

                <input
                    type="number"
                    autoComplete="off"
                    id="customerAmount"
                    className="form-control"
                    placeholder={placeHolderTXT}
                    value={this.props.customerAmount}
                    onInput={this.crytoCurrencyCalculate.bind(this)}
                    min="0"
                    required
                />

                {(() =>{
                    if(!limitsOK && this.props.cryptoAmount != ""){
                        return (
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-thumbs-o-down red"></i>
                                <strong>{limitsErrorMsg}</strong>
                            </div>
                        )
                    }
                })()}

                <input
                    type="number"
                    id="cryptoAmount"
                    className="form-control"
                    value={this.props.cryptoAmount}
                    placeholder={translate('CRYPTO_AMOUNT_TXT')}
                    onInput={this.customerAmountCalculate.bind(this)}
                />
            </div>
        )
    }
});

module.exports.Amount = Amount;