import React from 'react'
import {InfoMethod} from './infoMethod'
import Formsy from 'formsy-react'
import {MyInput} from '../../MyInput'
import {SelectPayAccount} from '../../selectPayAccount'

let AskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerOption: React.PropTypes.string,
		originPath: React.PropTypes.string,
		payAccounts: React.PropTypes.array
	},

	componentDidMount: function() {
		this.context.router.push('/'+this.props.customerOption+'/'+this.props.selectedProcessor.displayName.toLowerCase()+'/');
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
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
													<SelectPayAccount payAccounts={this.props.payAccounts} processor={this.props.selectedProcessor}/>
                          <MyInput name="email" title="" type="hidden" validations="isEmail" validationError="This is not a valid email" required />
                          <MyInput name="amount" title="Amount:" type="number" step="any" validations="isNumeric" validationError="This is not a valid amount" required />
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