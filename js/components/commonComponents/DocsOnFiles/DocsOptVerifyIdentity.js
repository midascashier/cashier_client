import React from 'react'
import {Link} from 'react-router'
import {DrawDropUpload} from '../files/DrawDropUpload'
import {translate} from '../../../constants/Translate'

let DocsOptVerifyIdentity = React.createClass({

    getInitialState(){
        return{
            checkOption: false,
            verifyIdOptSelect: null
        }
    },

    switchVerifyType(e){
        this.setState({
            verifyIdOptSelect: null,
            checkOption: e.target.checked
        });
    },

    verifyIdOptionsChange(e){
        let actualState = this.state;
        actualState.verifyIdOptSelect = e.target.getAttribute('id');
        this.setState(actualState);
    },

    verifyIdOptionsReset(){
        let actualState = this.state;
        actualState.verifyIdOptSelect = null;
        this.setState(actualState);
    },

    render(){
        return(
            <div id="CheckIdContent">

                {(() =>{
                    if(this.state.verifyIdOptSelect){
                        let src = "../images/" + this.state.verifyIdOptSelect + ".png";
                        return(
                            <div id="docsFilesShowOptionSelectedContent" onClick={this.verifyIdOptionsReset}>
                                <img
                                    src={src}
                                    id="docsFilesShowOptionSelected"
                                    title={translate('DOCS_FILE_VERITY_CHANGE_OPTIONS')}
                                />
                                <span>{translate('DOCS_FILE_GO_BACK')}</span>
                            </div>
                        )
                    }
                })()}

                <div id="docsFileTXT">
                    
                </div>

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
                    if(!this.state.checkOption && !this.state.verifyIdOptSelect){
                        return (
                            <div id="CheckIdVerifyOptions">
                                <img
                                    id="driverLicenseOption"
                                    className="docsFilesVerifyIdOptions"
                                    onClick={this.verifyIdOptionsChange}
                                    src="../images/driverLicenseOption.png"
                                    alt={translate('DOCS_FILE_VERIFY_OPTIONS_DRIVER_ID')}
                                    title={translate('DOCS_FILE_VERIFY_OPTIONS_DRIVER_ID')}
                                />

                                <img
                                    id="passportOption"
                                    src="../images/passportOption.png"
                                    onClick={this.verifyIdOptionsChange}
                                    className="docsFilesVerifyIdOptions"
                                    alt={translate('DOCS_FILE_VERIFY_OPTIONS_PASSPORT')}
                                    title={translate('DOCS_FILE_VERIFY_OPTIONS_PASSPORT')}
                                />

                                <img
                                    id="idDocumentOption"
                                    className="docsFilesVerifyIdOptions"
                                    src="../images/idDocumentOption.png"
                                    onClick={this.verifyIdOptionsChange}
                                    alt={translate('DOCS_FILE_VERIFY_OPTIONS_DOCUMENT_ID')}
                                    title={translate('DOCS_FILE_VERIFY_OPTIONS_DOCUMENT_ID')}
                                />
                            </div>
                        )
                    }
                })()}

                {(() =>{
                    if(this.state.checkOption || this.state.verifyIdOptSelect){
                        return(
                            <div id="DrawDropUploadElement">
                                <DrawDropUpload/>
                            </div>
                        )
                    }
                })()}

                {(() =>{
                    if(!this.state.checkOption && !this.state.verifyIdOptSelect){
                        return (
                            <div id="DocsFileBack">
                                <Link to={`/transaction_history/`}>
                                    <span>{translate('DOCS_FILE_GO_BACK')}</span>
                                </Link>
                            </div>
                        )
                    }
                })()}
            </div>
        )
    }
});

module.exports.DocsOptVerifyIdentity = DocsOptVerifyIdentity;