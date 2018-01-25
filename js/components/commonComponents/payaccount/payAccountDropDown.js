import React from 'react'
import {SelectPayAccount} from '../SelectPayAccount'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/CashierActions'
import {CustomerService} from '../../../services/CustomerService'

let PayAccountDropDown = React.createClass({

    propTypes:{
        info: React.PropTypes.func,
        amount: React.PropTypes.node,
        setAmount: React.PropTypes.func,
        msgDeleteBtn: React.PropTypes.string
    },

    /**
     * edit payAccount
     */
    editPayAccount(value = 1){
        UIService.setCCEditMode(value);
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
        }else{
            UIService.changeUIState('/' + UIService.getCurrentView() + '/');
        }
    },

    render(){
        let deleteButton = '';
        let editButtonDisplay;
        let info = this.props.info;
        let deleteButtonDisplay = '';
        let payAccount = info.payAccount;
        let isEditingCCInfo = UIService.getCCEditMode();
        let editButton = translate('PROCESSING_BUTTON_EDIT_CARD', 'Edit Card');

        if(!this.props.msgDeleteBtn){
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

        if(isEditingCCInfo == 0){
            editButtonDisplay = (
                <button type='button' onClick={this.editPayAccount} className='btn btn-xs btn-green'>
                    {editButton}
                </button>
            )
        }

        return(
            <div className="form-group" id="payAccount">
                <label className="col-sm-4 control-label">{translate('SELECT_ACCOUNT', 'Select your account')}:</label>
                <div className="col-sm-5" id="selectPayAccount">
                    <SelectPayAccount setAmount={this.props.setAmount} amount={this.props.amount}/>
                </div>
                <div className="col-sm-3">
                    {deleteButtonDisplay}
                </div>

                {(() =>{
                    if(UIService.isCC()){
                        return(
                            <div className="col-sm-2">
                                {editButtonDisplay}
                            </div>
                        );
                    }
                })()}
            </div>
        )
    }
});

module.exports.PayAccountDropDown = PayAccountDropDown;