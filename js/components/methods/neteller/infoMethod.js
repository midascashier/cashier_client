import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore';

const InfoMethod = React.createClass({
	getInitialState: function () {
		let button_text = "";
		let next_step = "";
		if (CashierStore.getCurrentStep() == "infoMethod") {
			button_text = "Deposit With Neteller";
			next_step = "askinfo";
		} else {
			button_text = "Complete Deposit";
			next_step = "ticket";
		}
		return { button_text: button_text, next_step: next_step};
	},
	render() {
		return (
			<div id="infoLimits" className="row">
        <p><a href="#">Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></a></p>
        <div className="col-sm-12">
          <div className="title">Neteller Deposit Limits</div>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Min. Deposit:</td>
                  <td><span>$10</span></td>
                </tr>
                <tr>
                  <td>Max. Deposit:</td>
                  <td><span>$640 / 24 hours</span></td>
                </tr>
                <tr>
                  <td></td>
                  <td><span>$1,500 / 7 Days</span></td>
                </tr>
                <tr>
                  <td></td>
                  <td><span>$2000 / 24 hours</span></td>
                </tr>
                <tr>
                  <td>Remaining Limit:</td>
                  <td><span>$640.00</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-6">
                  <b><Link to={`/deposit/neteller/${this.state.next_step}`}>{this.state.button_text} >></Link></b>
                </div>
                <div className="col-sm-6">
                  <img src={CashierStore.getOriginPath() + '/images/ssl.png'} alt="ssl"/>
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
});

let NetellerInfo = React.createClass({
	getInitialState: function () {
		CashierStore.setCurrentStep("infoMethod");
		return null;
	},
	render() {
		return (
			<div id="infoMethod">
				<InfoMethod />
			</div>
		)
	}
});

module.exports.NetellerInfo = NetellerInfo;
module.exports.InfoMethod = InfoMethod;