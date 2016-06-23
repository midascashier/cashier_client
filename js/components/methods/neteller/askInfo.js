import React from 'react'
import {SelectPayAccount} from '../../selectPayAccount'
import {AmountController} from '../../amountController'
import {MyInput} from '../../myInput'

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
												Password:
													<MyInput />
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


module.exports.NetellerAskInfo = AskInfo;