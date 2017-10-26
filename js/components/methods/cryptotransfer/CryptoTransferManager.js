import { ApplicationService } from '../../../services/ApplicationService'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'

let CryptoTransferManager = {

    initialMethods(props) {
        this.searchCurrency();
        this.selectedCurrency(props);
        this.crytoCurrencyCalculate(props);

        window.onclick = function (event) {
            if (event.target == document.getElementById('cryptoTransferModal')) {
                $('#cryptoTransferModal').css('display', 'none');
            }
        }
    },

    showCurrencies(){
        $('#cryptoTransferModal').css('display', 'flex');
    },

    hideCurrencies(){
        $('#cryptoTransferModal').css('display', 'none');
    },

    searchCurrency() {
        $('#cryptoTransferModal-currencySearch').on('input', function () {
            let txtSearch = $(this).val().toLowerCase();
            if(txtSearch == '') {
                $('.cryptoTransferCurrency').show();
            }else{
                $('.cryptoTransferCurrency').show().not('[id ^= "' + txtSearch + '"]').hide().filter('[id = "' + txtSearch + '"]').show();
            }
        });
    },

    selectedCurrency(props, self = this) {
        $('.cryptoTransferCurrency').click(function () {
            let symbolSelect = $(this).attr('id');
            self.currencyActions(symbolSelect, props);
        });
    },

    currencyActions(symbolSelect ,props) {
        let img = $('#' + symbolSelect + ' img').attr('src');
        let symbolName = $('#' + symbolSelect + 'Name').text();
        let symbolValue = $('#' + symbolSelect + 'Symbol').val();
        this.getCurrencyRate(symbolValue, props);

        //DOM update
        $('#FAQs').removeAttr('style');
        $('#imgSmall').attr('src', img);
        $('#symbolName').text(symbolName);
        $('#currencyName').val(symbolName);
        $('#AskInform').removeAttr('style');
        $('#Important').removeAttr('style');
        $('#currencySymbol').val(symbolValue);
        $('#AuthComponent').removeAttr('style');
        $('#cryptoAskInform').css('display', 'block');
        $('#cryptoTransfer-Btn-content').css('display', 'block');

        $('#cryptoTransfer-Btn').css({
            'color' : '#fff',
            'border' : 'none',
            'background-color' : '#fff'
        });

        this.hideCurrencies();
        this.calculateLimits(symbolValue, props);
    },

    getCurrencyRate(symbolValue, props) {
        let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_GET_RATE + symbolValue + '_BTC';
        fetch(url, {method: 'GET'}).then((response) => {
            return response.json();
        }).then((rate) => {
            props.rate = rate.rate;
        }).catch((err) => {
            console.error(err);
        });
    },

    calculateLimits(symbolValue, props) {
        let round = 5;
        let finalMin = null;
        let finalMax = null;
        let isCusMin = false;
        let isCusMax = false;

        let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_GET_MARKET + symbolValue + '_BTC';
        let spinCoin = "<div class='lds-circle'></div>";
        $('#cryptoLimits span').html(spinCoin);

        let limitMin = null;
        let limitMax = null;
        let limits = UIService.getProcessorLimitMinMax();
        let caLimitMin = limits.minAmount;
        let caLimitMax = limits.maxAmount;

        fetch(url, {method: 'GET'}).then((response) => {
            return response.json();
        }).then((market) => {

            if(props.rate) {
                limitMin = props.rate * market.minimum;
                limitMax = props.rate * market.maxLimit;

                props.setAmount(caLimitMin);
                let caLimitMinBTC = $('#btcAmount').val();

                let min =  null;
                if(caLimitMinBTC > limitMin){
                    min = caLimitMinBTC;
                    isCusMin = true;
                }else{
                    min = limitMin;
                    isCusMin = false;
                }

                min = parseFloat(min).toPrecision(3);
                props.setBTCAmount(min);
                let minAmount = parseFloat($('#amount').val());
                let final = Math.round(minAmount + round);
                finalMin = (isCusMin) ? caLimitMin : final;

                //Max Limits
                props.setAmount(caLimitMax);
                let caLimitMaxBTC = $('#btcAmount').val();

                let max =  null;
                if(caLimitMaxBTC > limitMax){
                    max = caLimitMaxBTC;
                    isCusMax = true;
                }else{
                    max = limitMax;
                    isCusMax = false;
                }

                max = parseFloat(max).toPrecision(3);
                props.setBTCAmount(max);
                let maxAmount = parseFloat($('#amount').val());
                final = Math.round(maxAmount + round);
                finalMax = (isCusMax) ? caLimitMax : final;

                this.minAmount = finalMin;
                this.maxAmount = finalMax;

                let currency = props.limits.currencyCode;
                let maxLimitCont = translate('PROCESSING_MIN', 'Min') + ApplicationService.currency_format(finalMin) + ' ' + currency + ' - ';
                let minLimitCont = translate('PROCESSING_MAX', 'Max') + ApplicationService.currency_format(finalMax) + ' ' + currency;
                let limitContent = maxLimitCont + ' ' + minLimitCont;
                let limitsCont = "<span>" + limitContent + "</span>";

                $('#cryptoLimits').html(limitsCont);
            }
        }).catch((err) => {
            console.error(err);
        });
    },

    crytoCurrencyCalculate(props) {
        $('#customerAmount').on('input', function () {
            let amount = parseFloat($(this).val()).toPrecision(3);
            props.setBTCAmount(amount);
            amount = parseFloat(props.rate * props.btcAmount);
            props.cryptoAmount = amount.toFixed(8);
        });
    }
};

module.exports.CryptoTransferManager = CryptoTransferManager;