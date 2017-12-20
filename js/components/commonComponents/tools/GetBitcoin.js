import React from 'react'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'
import { TransactionService } from '../../../services/TransactionService'

let GetBitcoin = React.createClass({

    /**
     * Execute the initial functions when the component is mounted
     */
    componentWillMount(){
        window.onclick = function (event) {
            if (event.target == document.getElementById('getBitcoinModal')) {
                $('#getBitcoinModal').css('display', 'none');
            }
        };
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return CashierStore.getCoindDirect();
    },

    /**
     * this is the callback function the store calls when a state change
     *
     * @private
     */
    _onChange(){
        this.setState(CashierStore.getCoindDirect());
    },

    showBitcoinContent(){
      $('#getBitcoinModal').css('display', 'flex');
    },

    hideBitcoinContent(){
        $('#getBitcoinModal').css('display', 'none');
    },

    login(){
        let email = document.getElementById('coinDirectEmail');
        let password = document.getElementById('coinDirectPassword');

        let params = {
            email: email.value,
            password: password.value
        };

        TransactionService.coinDirectLogin(params);
    },

    getUser(){
        if(this.state.login.linkId){
            TransactionService.coinDirectGetUser(this.state.login.linkId);
        }
    },

    switchAction(){
        let msgGO = 'GET_BITCOIN_GO_LOGIN';
        let show = $('#coinDirectConfirmPass').css('visibility');
        if(show == 'hidden'){
            let actualState = this.state;
            actualState.btnGO = 'GET_BITCOIN_SIGN_UP';
            this.setState(actualState);

            show = 'visible';
            msgGO = 'GET_BITCOIN_GO_SIGN_UP';
        }else{
            show = 'hidden';
            let actualState = this.state;
            actualState.btnGO = 'GET_BITCOIN_LOGIN';
            this.setState(actualState);
        }

        let actualState = this.state;
        actualState.messageGO = msgGO;
        this.setState(actualState);

        $('#coinDirectConfirmPass').css('visibility', show);
    },

    render(){
        if(this.state.login.linkId){
            this.getUser();
        }

        let placeEmail = 'GET_BITCOIN_PLACE_EMAIL';
        let placePassword = 'GET_BITCOIN_PLACE_PASSWORD';
        let placeConfirmPass = 'GET_BITCOIN_PLACE_CONFIRM_PASS';

        return(
            <div className="col-sm-12 mod-center">
                <button className="btn-getBitcoin coinDirectElement" type="button" value="Get bitcoins" onClick={this.showBitcoinContent}>
                    <i className="fa fa-btc"/>{translate('GET_BITCOIN')}
                </button>

                <div id='getBitcoinModal' className="modal">
                    <div id='getBitcoinModal-content'>
                        <div id='getBitcoinModal-header'>
                            <span className='modal-close' onClick={this.hideBitcoinContent}>&times;</span>
                            <h2>Coin Direct</h2>
                        </div>

                        <div id="getBitcoinModal-Form">
                            <input type="text" id="coinDirectEmail" placeholder={translate(placeEmail)}/>
                            <input type="password" id="coinDirectPassword" placeholder={translate(placePassword)}/>
                            <input type="password" id="coinDirectConfirmPass" placeholder={translate(placeConfirmPass)}/>
                            <button id="coinDirectGo" className="btn btn-green" onClick={this.login}>{translate(this.state.btnGO)}</button>
                            <p>{translate(this.state.messageGO)}<a onClick={this.switchAction}>{translate('HERE')}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    /**
     * component is ready
     */
    componentDidMount() {
        CashierStore.addChangeListener(this._onChange);
    },

    /**
     * React function to remove listener to this component once is unmounted
     */
    componentWillUnmount() {
        CashierStore.removeChangeListener(this._onChange);
    }
});

module.exports.GetBitcoin = GetBitcoin;