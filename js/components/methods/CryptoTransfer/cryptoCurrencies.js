import React from 'react'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import { ApplicationService } from '../../../services/ApplicationService'

let CryptoCurrencies = React.createClass({

    propTypes: {
        rate: React.PropTypes.number,
        limits: React.PropTypes.object,
        setLimits: React.PropTypes.func,
        currency: React.PropTypes.string,
        getCurrencyRate: React.PropTypes.func,
        amountToBTCCalculate: React.PropTypes.func,
        btcToAmountCalculate: React.PropTypes.func,
        setCryptoCurrencyISO: React.PropTypes.func,
        setCryptoCurrencyName: React.PropTypes.func
    },

    currencyActions(event) {
        let symbolSelect = event.currentTarget.id;
        let img = $('#' + symbolSelect + ' img').attr('src');
        let symbolName = $('#' + symbolSelect + 'Name').text();
        let symbolValue = $('#' + symbolSelect + 'Symbol').val();

        this.props.setCryptoCurrencyName(symbolName);
        this.props.setCryptoCurrencyISO(symbolValue);
        this.props.getCurrencyRate(symbolValue);

        //DOM update
        $('#FAQs').removeAttr('style');
        $('#imgSmall').attr('src', img);
        $('#symbolName').text(symbolName);
        $('#currencyName').val(symbolName);
        $('#symbolValue').text(symbolValue);
        $('#AskInform').removeAttr('style');
        $('#Important').removeAttr('style');
        $('#AuthComponent').removeAttr('style');
        $('#cryptoAskInform').css('display', 'block');
        $('#cryptoTransfer-Btn-content').css('display', 'block');

        $('#cryptoTransfer-Btn').css({
            'color' : '#fff',
            'border' : 'none',
            'background-color' : '#fff'
        });

        let round = 5;
        let finalMin = null;
        let finalMax = null;
        let isCusMin = false;
        let isCusMax = false;

        let spinCoin = "<div class='lds-circle'></div>";
        $('#cryptoLimits span').html(spinCoin);

        let limitMin = null;
        let limitMax = null;
        let limits = UIService.getProcessorLimitMinMax();
        let caLimitMin = limits.minAmount;
        let caLimitMax = limits.maxAmount;
        let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_GET_MARKET + symbolValue + '_BTC';

        this.hideCurrencies();
        fetch(url, {method: 'GET'}).then((response) => {
            return response.json();
        }).then((market) => {

            let waitRate = setInterval(() => {
                if(this.props.rate) {
                    limitMin = this.props.rate * market.minimum;
                    limitMax = this.props.rate * market.maxLimit;

                    let caLimitMinBTC = this.props.amountToBTCCalculate(caLimitMin);

                    let min =  null;
                    if(caLimitMinBTC > limitMin){
                        min = caLimitMinBTC;
                        isCusMin = true;
                    }else{
                        min = limitMin;
                        isCusMin = false;
                    }

                    min = parseFloat(min).toPrecision(3);
                    let minAmount = this.props.btcToAmountCalculate(min);
                    let final = Math.round(minAmount + round);
                    finalMin = (isCusMin) ? caLimitMin : final;

                    //Max Limits
                    let caLimitMaxBTC = this.props.amountToBTCCalculate(caLimitMax);

                    let max =  null;
                    if(caLimitMaxBTC > limitMax){
                        max = caLimitMaxBTC;
                        isCusMax = true;
                    }else{
                        max = limitMax;
                        isCusMax = false;
                    }

                    max = parseFloat(max).toPrecision(3);
                    let maxAmount = this.props.btcToAmountCalculate(max);
                    final = Math.round(maxAmount + round);
                    finalMax = (isCusMax) ? caLimitMax : final;

                    let currency = this.props.limits.currencyCode;
                    let maxLimitCont = translate('PROCESSING_MIN', 'Min') + ApplicationService.currency_format(finalMin) + ' ' + currency + ' - ';
                    let minLimitCont = translate('PROCESSING_MAX', 'Max') + ApplicationService.currency_format(finalMax) + ' ' + currency;
                    let limitContent = maxLimitCont + ' ' + minLimitCont;
                    let limitsCont = "<span>" + limitContent + "</span>";

                    let limits = {
                        minAmount : finalMin,
                        maxAmount : finalMax,
                        currencyCode : currency
                    };

                    this.props.setLimits(limits);
                    $('#cryptoLimits').html(limitsCont);

                    clearTimeout(waitRate);
                }
            }, 1000);

        }).catch((err) => {
            console.error(err);
        });
    },

    hideCurrencies(){
        $('#cryptoTransferModal').css('display', 'none');
    },

    render() {
        let currency = this.props.currency;
        let id = (currency.status == 'available') ? currency.name.toLowerCase().replace(' ', '') : '';
        let unavailable = (currency.status != 'available') ? ' unavailableCurrency' : '';
        let unavailableTXT = (currency.status != 'available') ? <span>{translate('CRYPTO_UNAVAILABLE_TXT', 'Temporarily disabled')}</span> : '';

        return (
            <div id={id} className={'cryptoTransferCurrency' + unavailable} onClick={this.currencyActions.bind(this)}>
                <img src={currency.image} alt={currency.name}/>
                {unavailableTXT}
                <span id={id + 'Name'} className="currentName">{currency.name}</span>
                <input type='hidden' id={id + 'Symbol'} value={currency.symbol}/>
                <input type='hidden' id={id + 'Status'} value={currency.status}/>
                <input type='hidden' id={id + 'ImgSmall'} value={currency.imageSmall}/>
            </div>      
        );
    }
});

module.exports.CryptoCurrencies = CryptoCurrencies;