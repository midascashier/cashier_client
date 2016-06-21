import React from 'react'
import {InfoMethod} from './infoMethod'
import {SelectPayAccount} from '../../selectPayAccount'
import {CashierActions} from '../../../actions/cashierActions'

let AskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerOption: React.PropTypes.string,
		originPath: React.PropTypes.string
	},
	render() {
		return (
			<div id="askAmount" className="box">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-12">
                <div className="title">Please Enter the Deposit Information</div>
              </div>
              <div className="col-sm-12">
                <div className="infoCol">
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="method active pull-left">
                          <img className="img-responsive" src={this.props.originPath + '/images/processors/333.png'} alt="Neteller"/>
                        </div>
                      </div>
                      <div className="col-sm-9">
												Neteller Account:
													<SelectPayAccount />
												Amount:
													<AmountController />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
});

let AmountController = React.createClass({

	changeValue(event) {
		let amount = event.currentTarget.value;
		CashierActions.setTransactionAmount(amount);
	},

	render() {
		return (
			<div>
				<input
					type={this.props.type || 'text'}
					name={this.props.name}
					onChange={this.changeValue}
					value=""
				/>
			</div>
		);
	}
});

module.exports.NetellerAskInfo = AskInfo;