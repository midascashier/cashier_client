import React from 'react'
import {SelectPayAccount} from '../../selectPayAccount'
import {AmountController} from '../../amountController'
import {Input} from '../../inputs'

let NetellerAskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerOption: React.PropTypes.string,
		originPath: React.PropTypes.string,
		NetellerPasswordInput:   React.PropTypes.func,
		password: React.PropTypes.string
	},

	getInitialState() {
		return this.refreshLocalState();
	},

	getDefaultProps() {
		return {
			amount: 123
		};
	},

	refreshLocalState() {
		return {
			value: ''
		}
	},

	render() {
		console.log(this.props.amount);
		AmountController.setAmount(this);
		console.log(this.props.amount);
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
												Password:
													<Input onChange={this.props.NetellerPasswordInput} value={this.props.password} type="password"/>
												Amount:
													<Input onChange={this.props.NetellerPasswordInput} value={this.props.password} type="password"/>
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


module.exports.NetellerAskInfo = NetellerAskInfo;