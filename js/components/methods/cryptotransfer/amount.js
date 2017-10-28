import React from 'react'
import { translate } from '../../../constants/Translate'
import  errorMsgs  from '../../../constants/limitsErrorMsgs'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'

let Amount = React.createClass({

    propTypes: {
        amount: React.PropTypes.node,
        btcAmount: React.PropTypes.node,
        cryptoAmount: React.PropTypes.node,
        customerAmount: React.PropTypes.node,

        setAmount: React.PropTypes.func,
        setBTCAmount: React.PropTypes.func,
        setCryptoAmount: React.PropTypes.func,
        setCustomerAmount: React.PropTypes.func,

        rate: React.PropTypes.number,
        limits: React.PropTypes.object
    },

    crytoCurrencyCalculate(event) {
        let amount = parseFloat(event.target.value);
        this.props.setCustomerAmount(amount);
        this.props.setAmount(amount);
        amount = parseFloat(this.props.rate * this.props.btcAmount).toFixed(8);
        this.props.setCryptoAmount(amount, this.props.rate);
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
                    onChange={this.crytoCurrencyCalculate.bind(this)}
                    min="0"
                    required
                />

                {(() =>{
                    if(!limitsOK && this.props.amount != ""){
                        return (
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-thumbs-o-down red"></i>
                                <strong>{limitsErrorMsg}</strong>
                            </div>
                        )
                    }
                })()}

                <input
                    className="form-control"
                    placeholder={translate('CRYPTO_AMOUNT_TXT')}
                    type="number"
                    id="cryptoAmount"
                    value={this.props.cryptoAmount}
                />

                <input
                    type="hidden"
                    id="amount"
                    value={this.props.amount}
                />
            </div>
        )
    }
});

module.exports.Amount = Amount;