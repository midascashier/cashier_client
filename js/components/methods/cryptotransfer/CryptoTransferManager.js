import { UIService } from '../../../services/UIService'

let CryptoTransferManager = {

    initialMethods() {
        this.hideCurrencies();
        this.searchCurrency();
    },

    showCurrencies(){
        $('#cryptoTransferModal').css('display', 'flex');
    },

    hideCurrencies(){
        $('#cryptoTransferModal').css('display', 'none');

        window.onclick = function (event) {
            if (event.target == document.getElementById('cryptoTransferModal')) {
                $('#cryptoTransferModal').css('display', 'none');
            }
        }
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

    currencyActions(symbolSelect) {
        let img = $('#' + symbolSelect + ' img').attr('src');
        let symbolName = $('#' + symbolSelect + 'Name').text();
        let symbolValue = $('#' + symbolSelect + 'Symbol').val();
        this.getCurrencyRate(symbolValue);

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
        this.calculateLimits(symbolValue);
    },

    getCurrencyRate(symbolValue) {
        let url = API.CRYPTO_API_URL + API.CRYPTO_API_GET_RATE + symbolValue + '_BTC';
        fetch(url, {method: 'GET'}).then((response) => {
            return response.json();
        }).then((rate) => {
            this.props.rate = rate.rate;
        }).catch((err) => {
            console.error(err);
        });
    },

    calculateLimits(symbolValue) {
        let round = 5;
        let finalMin = null;
        let finalMax = null;
        let isCusMin = false;
        let isCusMax = false;

        let url = API.CRYPTO_API_URL + API.CRYPTO_API_GET_MARKET + symbolValue + '_BTC';
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

            limitMin = this.props.rate * market.minimum;
            limitMax = this.props.rate * market.maxLimit;

            this.props.setAmount(caLimitMin);
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
            this.props.setBTCAmount(min);
            let minAmount = parseFloat($('#amount').val());
            let final = Math.round(minAmount + round);
            finalMin = (isCusMin) ? caLimitMin : final;

            //Max Limits
            this.props.setAmount(caLimitMax);
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
            this.props.setBTCAmount(max);
            let maxAmount = parseFloat($('#amount').val());
            final = Math.round(maxAmount + round);
            finalMax = (isCusMax) ? caLimitMax : final;

            alert(finalMin + ' ' + finalMax);

        }).catch((err) => {
            console.error(err);
        });
    }
};

module.exports.CryptoTransferManager = CryptoTransferManager;