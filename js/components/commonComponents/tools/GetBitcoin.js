import React from 'react'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'

let GetBitcoin = React.createClass({

    componentWillMount(){

        this.setState(this.refreshLocalState());

        window.onclick = function (event) {
            if (event.target == document.getElementById('getBitcoinModal')) {
                $('#getBitcoinModal').css('display', 'none');
            }
        };
    },

    /**
     * this is the callback function the store calls when a state change
     *
     * @private
     */
    _onChange() {
        this.setState(this.refreshLocalState());
    },

    /**
     * this function sets and return object with local states
     */
    refreshLocalState() {
        return {
            btnGO : 'GET_BITCOIN_LOGIN',
            messageGo : 'GET_BITCOIN_GO_LOGIN'
        }
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

    switchAction(){
        let msgGo = 'GET_BITCOIN_GO_LOGIN';
        let show = $('#coinDirectConfirmPass').css('visibility');
        if(show == 'hidden'){
            this.setState({
                btnGO : 'GET_BITCOIN_SIGN_UP'
            });

            show = 'visible';
            msgGo = 'GET_BITCOIN_GO_SIGN_UP';
        }else{
            show = 'hidden';
            this.setState({
                btnGO : 'GET_BITCOIN_LOGIN'
            });
        }

        this.setState({
            messageGo : msgGo
        });

        $('#coinDirectConfirmPass').css('visibility', show);
    },

    render(){
        let msgGO = this.state.messageGo;
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
                            <p>{translate(msgGO)}<a onClick={this.switchAction}>{translate('HERE')}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports.GetBitcoin = GetBitcoin;