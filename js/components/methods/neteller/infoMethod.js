import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/cashierActions'
import {Loading} from '../../loading/loading'

let NetellerInfoMethod = React.createClass({

	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			processor: CashierStore.getProcessor(),
			currentPayAccount: CashierStore.getCurrentPayAccount(),
			originPath: CashierStore.getOriginPath()
		}
	},

	_onChange() {
    if(this.isMounted() === true){
      this.setState(this.refreshLocalState());
    }
	},

	confirm() {
		CashierActions.confirmStep();
	},

	render() {
		let minPayAccount=<Loading />;
		let maxPayAccount=<Loading />;
		let submitButton="";
		let payAccount= this.state.currentPayAccount;
		if (payAccount.payAccountId){
			minPayAccount=payAccount.limitsData.minAmount+" "+payAccount.limitsData.currencyCode;
			maxPayAccount=payAccount.limitsData.maxAmount+" "+payAccount.limitsData.currencyCode;
		}

		return (
			<div id="infoLimits" className="row">
        <div className="col-sm-12">
          <div className="title">Neteller Deposit Limits</div>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Min. Deposit:</td>
                  <td><span>{minPayAccount}</span></td>
                </tr>
                <tr>
                  <td>Max. Deposit:</td>
                  <td><span>{maxPayAccount}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-6">
									{(() => {
										if (payAccount.payAccountId){
											return <button type='button' className='btn btn-green' onClick={this.confirm}>Next</button>
										}
									})()}
                </div>
                <div className="col-sm-6">
                  <img src={this.state.originPath + '/images/ssl.png'} alt="ssl"/>
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
});

module.exports.NetellerInfoMethod = NetellerInfoMethod;