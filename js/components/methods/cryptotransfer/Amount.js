import React from 'react'
import Cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import errorMsgs from '../../../constants/limitsErrorMsgs'
import {ApplicationService} from '../../../services/ApplicationService'

let Amount = React.createClass({

    propTypes: {
        rate: React.PropTypes.number,
        getSymbol: React.PropTypes.func,
        loadLimits: React.PropTypes.bool,
        cryptoAmount: React.PropTypes.node,
        limitsCheck: React.PropTypes.string,
        customerAmount: React.PropTypes.node,
        conversionRate: React.PropTypes.node,
        setCryptoAmount: React.PropTypes.func,
        setAmountRateBTC: React.PropTypes.func,
        setCustomerAmount: React.PropTypes.func,
        amountToBTCCalculate: React.PropTypes.func,
        btcToAmountCalculate: React.PropTypes.func
    },

    crytoCurrencyCalculate(event){
        let cryptoAmount =  0;
        let symbol = this.props.getSymbol();
        let amount = parseFloat(event.target.value);

        if(symbol == 'BTC' || symbol == 'LTC' || symbol == 'BCH'){
            cryptoAmount = amount / this.props.rate;
        }else{
            let ltcAmount = amount / this.props.conversionRate;
            cryptoAmount = (ltcAmount / this.props.rate);
        }

        this.props.setCryptoAmount(cryptoAmount, amount);
    },

    customerAmountCalculate(event){
        let cryptoAmount = parseFloat(event.target.value);
        let btcAmount = cryptoAmount * parseFloat(this.props.rate).toFixed(8);
        this.props.setCustomerAmount(btcAmount, cryptoAmount);
        this.props.setAmountRateBTC(btcAmount);
    },

    render(){
        let action;
        let limitsErrorMsg;
        let limitsOK = false;

        let isWithDraw = UIService.getIsWithDraw();
        if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS || this.props.limitsCheck == Cashier.LOADING){
            limitsOK = true;
        }else{
            limitsErrorMsg = errorMsgs.limitsMsgs[this.props.limitsCheck];
        }

        if(isWithDraw){
            action = translate('WITHDRAW');
        }else{
            action = translate('DEPOSIT');
        }

        let placeHolderTXT = action + ' ' + translate('PROCESSING_AMOUNT', 'Amount');
        return (
            <div id="cryptoAmount">
                <div id="cryptoLimits">
                    {(() =>{
                        if(UIService.getLoadingLimits()){
                            return (
                                <div className='lds-circle'></div>
                            )
                        }

                        let currency = this.props.limits.currencyCode;
                        let maxLimitCont = translate('PROCESSING_MIN', 'Min') + ApplicationService.currency_format(this.props.limits.minAmount) + ' ' + currency + ' - ';
                        let minLimitCont = translate('PROCESSING_MAX', 'Max') + ApplicationService.currency_format(this.props.limits.maxAmount) + ' ' + currency;
                        let limitContent = maxLimitCont + ' ' + minLimitCont;

                        return <span>{limitContent}</span>
                    })()}
                </div>

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
                                <i className="fa fa-thumbs-o-down red"/>
                                <strong>{limitsErrorMsg}</strong>
                            </div>
                        )
                    }
                })()}

                {(() =>{
                    if(!isWithDraw){
                        return(
                            <input
                                type="number"
                                id="cryptoAmount"
                                className="form-control"
                                value={this.props.cryptoAmount}
                                placeholder={translate('CRYPTO_AMOUNT_TXT', 'Crypto amount')}
                                onInput={this.customerAmountCalculate.bind(this)}
                            />
                        )
                    }
                })()}
            </div>
        )
    }
});

module.exports.Amount = Amount;