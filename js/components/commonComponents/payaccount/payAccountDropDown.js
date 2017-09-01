import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { CustomerService } from '../../../services/CustomerService'

let PayAccountDropDown = React.createClass({

    propTypes: {
        info: React.PropTypes.func,
        msgDeleteBtn: React.PropTypes.string//This is a optional param
    },

    disablePayAccount() {
        CustomerService.getDisablePayAccount();
    },

    render(){

        let deleteButton = '';
        let deleteButtonDisplay = '';
        let info = this.props.info;
        let payAccount = info.payAccount;

        if (!this.props.msgDeleteBtn) {
            deleteButton  = translate('PROCESSING_BUTTON_DELETE_ACCOUNT');
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
                <label className="col-sm-4 control-label">{translate('SELECT_ACCOUNT', 'Account')}:</label>
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