import React from 'react'
import { translate } from '../../../constants/Translate'
import  errorMsgs  from '../../../constants/limitsErrorMsgs'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { ApplicationService } from '../../../services/ApplicationService'
import { CashierStore } from '../../../stores/CashierStore'

let Amount = React.createClass({

    render() {
        let action;
        let limitsErrorMsg;
        let limitsOK = false;

        let customer = CashierStore.getCustomer();
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
                <div id="cryptoLimits">
                    <span>{
                        translate('PROCESSING_MIN', 'Min') + ApplicationService.currency_format(this.props.limits.minAmount) + customer.currency + ' ' +
                        translate('PROCESSING_MAX', 'Max') + ApplicationService.currency_format(this.props.limits.maxAmount) +  customer.currency
                    }</span><br/>
                </div>

                <input
                    type="number"
                    autoComplete="off"
                    id="customerAmount"
                    name="customerAmount"
                    className="form-control"
                    placeholder={placeHolderTXT}
                    value={this.props.customerAmount}
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
                    type="hidden"
                    id="amount"
                    value={this.props.amount}
                />
            </div>
        )
    }
});

module.exports.Amount = Amount;