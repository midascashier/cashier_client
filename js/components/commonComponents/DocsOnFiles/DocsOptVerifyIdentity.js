import React from 'react'
import {DrawDropUpload} from '../files/DrawDropUpload'
import {translate} from '../../../constants/Translate'

let DocsOptVerifyIdentity = React.createClass({

    getInitialState(){
        return{check: false}
    },

    switchVerifyType(e){
        let check = e.target.checked;

        this.setState({
            check: check
        });
    },

    verifyIdOptionsChange(){
        let activoFijo = $('input[name="activoFijo"]:checked').val();
    },

    render(){
        return(
            <div id="CheckIdContent">
                <p className="title text-center">{translate('MY_REQUEST_VERIFY_TITLE')}</p>

                <div id="switchOpt">
                    <label className="switch">
                        <input type="checkbox" onChange={this.switchVerifyType}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className="OptTittle">
                    <span>{translate('MY_REQUEST_DOCS_OPTION_ID_TXT')}</span>
                    <span className="switch"/>
                    <span>{translate('MY_REQUEST_DOCS_OPTION_VE_EW_TXT')}</span>
                </div>

                {(() =>{
                    if(!this.state.check) {
                        return (
                            <div id="CheckIdVerifyOptions">
                                <input id="driverLicense" type="radio" name="verifyOptionsType" className="input-hidden" value="1" onChange={this.verifyIdOptionsChange}/>
                                <label for="driverLicense">
                                    <img src="../images/driverLicenseOption.png" alt="I'm sad"/>
                                </label>

                                <input id="idDocument" type="radio" name="verifyOptionsType" className="input-hidden" value="2" onChange={this.verifyIdOptionsChange}/>
                                <label for="idDocument">
                                    <img src="../images/idDocumentOption.png" alt="I'm happy"/>
                                </label>

                                <input id="passport" type="radio" name="verifyOptionsType" className="input-hidden" value="3" onChange={this.verifyIdOptionsChange}/>
                                <label for="passport">
                                    <img src="../images/passportOption.png" alt="I'm happy"/>
                                </label>
                            </div>
                        )
                    }
                })()}

                {(() =>{
                    if(!this.state.check || (this.state.check)) {
                        return(
                            <div id="DrawDropUploadContent">
                                <DrawDropUpload/>
                            </div>
                        )
                    }
                })()}
            </div>
        )
    }
});

module.exports.DocsOptVerifyIdentity = DocsOptVerifyIdentity;