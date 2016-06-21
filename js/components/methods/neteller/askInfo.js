import React from 'react'
import {InfoMethod} from './infoMethod'
import Formsy from 'formsy-react'
import {MyInput} from '../../MyInput'
import {SelectPayAccount} from '../../selectPayAccount'

let AskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerOption: React.PropTypes.string,
		originPath: React.PropTypes.string
	},
	getValue:() =>{
		return 0;
		console.log("TEST");
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
                        <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
													<SelectPayAccount />
                          <MyInput
														name="askInfoAmount"
														title="Amount:"
														type="number"
														value={getValue}
														step="any"
														validations="isNumeric"
														validationError="This is not a valid amount"
														/>
                        </Formsy.Form>
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