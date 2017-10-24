import React from 'react'
import { translate } from '../../../constants/Translate'
import  errorMsgs  from '../../../constants/limitsErrorMsgs'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { ApplicationService } from '../../../services/ApplicationService'
import { CashierStore } from '../../../stores/CashierStore'

let Amount = React.createClass({
    propTypes: {
        amount: React.PropTypes.node,
        setAmount: React.PropTypes.func,
        limitsCheck: React.PropTypes.string,

        cryptoAmount: React.PropTypes.node,
        setCryptoAmount: React.PropTypes.func
    },

    /**
     * Set transaction amount in the store
     *
     * @param event
     */
    changeValue(event) {
        let amount = event.currentTarget.value;
        this.props.setAmount(amount);
    },

    render() {
        let limits = UIService.getProcessorLimitMinMax();
        let customer = CashierStore.getCustomer();
        let limitsErrorMsg;
        let limitsOK = false;
        let amountFieldDisable = true;
        if(limits.minAmount && limits.maxAmount){
            amountFieldDisable = false;
        }
        if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS || this.props.limitsCheck == Cashier.LOADING){
            limitsOK = true;
        }else{
            limitsErrorMsg = errorMsgs.limitsMsgs[this.props.limitsCheck];
        }

        let action;
        let isWithDraw = UIService.getIsWithDraw();
        if (isWithDraw){
            action = translate('WITHDRAW');
        }else{
            action = translate('DEPOSIT');
        }
        let placeHolderTXT = action + ' ' + translate('PROCESSING_AMOUNT', 'Amount');
        return (
            <div id="cryptoAmount">
                <div id="cryptoLimits">
                    <span>
                        {translate('PROCESSING_MIN', 'Min')}: {ApplicationService.currency_format(limits.minAmount)} {customer.currency}
                        - {translate('PROCESSING_MAX', 'Max')}: {ApplicationService.currency_format(limits.maxAmount)} {customer.currency}
                    </span><br/>

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
                </div>

                <input
                    className="form-control"
                    placeholder={placeHolderTXT}
                    type="number"
                    autoComplete="off"
                    disabled={amountFieldDisable}
                    id="cryptoAmount"
                    name="cryptoAmount"
                    onChange={this.changeValue}
                    value={this.props.cryptoAmount}
                    min="0"
                    required
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