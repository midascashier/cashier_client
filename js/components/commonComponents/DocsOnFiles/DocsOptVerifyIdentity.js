import React from 'react'
import {Link} from 'react-router'
import {UIService} from '../../../services/UIService'
import {DrawDropUpload} from '../files/DrawDropUpload'
import {translate} from '../../../constants/Translate'

let DocsOptVerifyIdentity = React.createClass({

    element: {
        driverLicenseOption: {
            value: 1,
            name: 'driverLicenseOption'
        },

        passportOption: {
            value: 2,
            name: 'passportOption'
        },

        idDocumentOption: {
            value: 3,
            name: 'idDocumentOption'
        }
    },

    getInitialState(){
        return{
            checkOption: false,
            valueOption: false,
            verifyIdOptSelect: null
        }
    },

    componentWillMount(){
        UIService.docFilesCustomerFormsInformation(1)
    },

    switchVerifyType(e){
        this.setState({
            verifyIdOptSelect: null,
            checkOption: e.target.checked
        });
    },

    verifyIdOptionsChange(e){
        let actualState = this.state;
        let option = e.target.getAttribute('id');
        actualState.verifyIdOptSelect = option;
        actualState.valueOption = this.element[option].value;
        this.setState(actualState);
    },

    verifyIdOptionsReset(){
        this.setState(this.getInitialState());
    },

    uploadCurrentFiles(e){
        alert(e.target[0].files);

        let request = {
            
        }
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

                <div className="OptTittle">
                    <span>{translate('MY_REQUEST_DOCS_OPTION_ID_TXT')}</span>
                    <span className="switch"/>
                    <span>{translate('MY_REQUEST_DOCS_OPTION_VE_EW_TXT')}</span>
                </div>

                <div id="switchOpt">
                    <label className="switch">
                        <input type="checkbox" onChange={this.switchVerifyType}/>
                        <span className="slider round"/>
                    </label>
                </div>

                {(() =>{
                    if(!this.state.checkOption && !this.state.verifyIdOptSelect){
                        let ele = this.element;

                        return (
                            <div id="CheckIdVerifyOptions">
                                <img
                                    id={ele.driverLicenseOption.name}
                                    className="docsFilesVerifyIdOptions"
                                    onClick={this.verifyIdOptionsChange}
                                    src="../images/driverLicenseOption.png"
                                    alt={translate('DOCS_FILE_VERIFY_OPTIONS_DRIVER_ID')}
                                    title={translate('DOCS_FILE_VERIFY_OPTIONS_DRIVER_ID')}
                                />

                                <img
                                    id={ele.passportOption.name}
                                    src="../images/passportOption.png"
                                    onClick={this.verifyIdOptionsChange}
                                    className="docsFilesVerifyIdOptions"
                                    alt={translate('DOCS_FILE_VERIFY_OPTIONS_PASSPORT')}
                                    title={translate('DOCS_FILE_VERIFY_OPTIONS_PASSPORT')}
                                />

                                <img
                                    id={ele.idDocumentOption.name}
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
                                <DrawDropUpload action={this.uploadCurrentFiles}/>
                            </div>
                        )
                    }
                })()}

                {(() =>{
                    if(!this.state.checkOption && !this.state.verifyIdOptSelect){
                        return (
                            <div id="DocsFileBack">
                                <Link to={`/deposit/`}>
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