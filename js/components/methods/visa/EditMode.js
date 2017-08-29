import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'

let EditMode = React.createClass({

    render(){
        
        return(
            <div className="infoCol scroll">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-horizontal">
                            <form onSubmit={this.saveBillingInfo}>

                                <div className="form-group">
                                    <label className="col-sm-4 control-label">{translate('CREDIT_CARD_FIRST_NAME', 'First Name')}:</label>
                                    <div className="col-sm-8">
                                        <Input
                                            type="text"
                                            id="firstName" ref="firstName"
                                            value={personalData.firstName}
                                            onChange={this.changeValue.bind(null, 'personal', 'firstName', 0)}
                                            validate="isString" require
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_FIRST_NAME', 'Last Name')}:</label>
                                    <div className="col-sm-8">
                                        <Input
                                            type="text"
                                            id="lastName"
                                            ref="lastName"
                                            validate="isString"
                                            onChange={this.changeValue.bind(null, 'personal', 'lastName', 0)}
                                            value={personalData.lastName}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_COUNTRY', 'Country')}:</label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="country" value={addressData.country} onChange={this.changeValue.bind(null, 'address', 'country', 1)}>
                                            {countryOptionNodes}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_STATE', 'State')}:</label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="countryState" ref="state"
                                                value={addressData.state} disabled={!states.length}
                                                onChange={this.changeValue.bind(null, 'address', 'state', 1)}>
                                            {stateOptionNodes}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_CITY', 'City')}:</label>
                                    <div className="col-sm-8">
                                        <Input type="text" id="city" ref="city" validate="isString"
                                               onChange={this.changeValue.bind(null, 'address', 'city', 0)}
                                               value={addressData.city}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_ADDRESS', 'Address')}:</label>
                                    <div className="col-sm-8">
                                        <Input type="text" id="address" ref="address1" validate="isString"
                                               onChange={this.changeValue.bind(null, 'address', 'address1', 0)}
                                               value={addressData.address1}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_ZIP', 'Postal Code')}:</label>
                                    <div className="col-sm-8">
                                        <Input type="text" id="zip" ref="zip" validate="isNumber"
                                               onChange={this.changeValue.bind(null, 'address', 'zip', 0)}
                                               value={addressData.zip}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_EMAIL', 'Email')}:</label>
                                    <div className="col-sm-8">
                                        <Input type="text" id="email" ref="email" validate="isEmail" require
                                               onChange={this.changeValue.bind(null, 'personal', 'email', 0)}
                                               value={personalData.email}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="col-sm-4 control-label">{translate('CREDIT_CARD_PHONE', 'Phone')}:</label>
                                    <div className="col-sm-8">
                                        <Input type="text" id="phone" ref="phone" validate="isNumber" require
                                               onChange={this.changeValue.bind(null, 'personal', 'phone', 0)}
                                               value={personalData.phone}/>
                                    </div>
                                </div>

                                <button type='submit' className='btn btn-green'>
                                    {translate('PROCESSING_BUTTON_SAVE', 'Save')}
                                </button>
                                
                                <button type='button' className='btn btn-green'
                                        onClick={this.editBillingInfo.bind(null, 0)}>
                                    {translate('PROCESSING_BUTTON_CANCEL', 'Cancel')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports.EditMode = EditMode;