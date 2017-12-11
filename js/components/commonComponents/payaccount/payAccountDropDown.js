import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { CustomerService } from '../../../services/CustomerService'
import { UIService } from '../../../services/UIService'
import { CashierActions } from '../../../actions/CashierActions'

let PayAccountDropDown = React.createClass({

    propTypes: {
        info: React.PropTypes.func,
        msgDeleteBtn: React.PropTypes.string//This is a optional param
    },

    /**
     * Disable current selected pay account
     */
    disablePayAccount() {
        CustomerService.getDisablePayAccount();
    },

    /**
     * Cancel button
     */
    cancel() {
        let payAccounts = CashierStore.getProcessorPayAccount();
        if(Object.keys(payAccounts).length > 0){
            let processor = CashierStore.getProcessor();
            let previousPayAccount = 0;
            for(let payAccount in payAccounts){
                if(previousPayAccount == 0){
                    previousPayAccount = payAccount;
                }
            }
            CashierActions.changePayAccount(previousPayAccount, processor.processorId);
        } else {
            UIService.changeUIState('/' + UIService.getCurrentView() + '/');
        }
    },

    render(){

        let deleteButton = '';
        let deleteButtonDisplay = '';
        let info = this.props.info;
        let payAccount = info.payAccount;

        if (!this.props.msgDeleteBtn) {
            deleteButton  = translate('PROCESSING_BUTTON_DELETE_ACCOUNT', 'Delete Account');
        }else{
            deleteButton = this.props.msgDeleteBtn;
        }

        if(payAccount != 0){
            deleteButtonDisplay = (
                <button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
                    {deleteButton}
                </button>
            );
        }

        return(
            <div className="form-group" id="payAccount">
                <label className="col-sm-4 control-label">{translate('SELECT_ACCOUNT', 'Select your account')}:</label>
                <div className="col-sm-5" id="selectPayAccount">
                    <SelectPayAccount setAmount={info.setAmount} amount={info.amount}/>
                </div>
                <div className="col-sm-3">
                    {deleteButtonDisplay}
                </div>
            </div>
        )
    }
});

module.exports.PayAccountDropDown = PayAccountDropDown;