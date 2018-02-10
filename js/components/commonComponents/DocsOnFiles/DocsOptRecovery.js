import React from 'react'
import Cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {DrawDropUpload} from '../files/DrawDropUpload'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {DocsVerifyIDCustomerForms} from './DocsVerifyIDCustomerForms'
import {TransactionService} from '../../../services/TransactionService'

let DocsOptRecovery = React.createClass({

    /**
     * React function to set component initial state
     */
    getInitialState(){
        let docFile = UIService.getDocsFile();

        return{
            files: false,
            addDocument: false,
            checkOption: false,
            valueOption: false,
            forms: docFile.forms,
            verifyIdOptSelect: null
        }
    },

    /**
     * this is the callback function the store calls when a state change
     *
     * @private
     */
    _onChange(){
        this.setState(this.getInitialState());
    },

    /**
     * Set files selected to upload
     *
     * @param files
     */
    setFiles(files){
        let actualState = this.state;
        actualState.files = files;
        this.setState(actualState);
    },

    /**
     * Change type ID option
     *
     * @param e
     */
    switchVerifyType(e){
        let actualState = this.state;
        actualState.verifyIdOptSelect = null;
        actualState.checkOption = e.target.checked;
        this.setState(actualState);
    },

    /**
     * Selected option from verify ID type
     *
     * @param e
     */
    verifyIdOptionsChange(e){
        let actualState = this.state;
        let option = e.target.getAttribute('id');
        actualState.verifyIdOptSelect = option;
        actualState.valueOption = this.element[option].value;
        this.setState(actualState);
    },

    /**
     * Restart states option selected
     */
    verifyIdOptionsReset(){
        this.setState(this.getInitialState());
    },

    /**
     * Add new document
     */
    addDocument(){
        let actualState = this.state;
        actualState.addDocument = true;
        this.setState(actualState);
    },

    /**
     * Upload files selected
     *
     * @param e
     */
    uploadCurrentFiles(e){
        e.preventDefault();
        let elementInformation = {};
        let files = this.state.files;
        let formData = new FormData();

        elementInformation['fileType'] = this.state.valueOption;
        elementInformation['value'] = e.target[0].value;
        formData.append('input[23]', JSON.stringify(elementInformation));

        for(let key in files){
            if(files.hasOwnProperty(key)){
                formData.append('23[]', files[key]);
            }
        }

        formData.append('documentFormCustomerId', '');
        formData.append('countExtraFiles', files.length);
        formData.append('actionType', this.element.action);
        formData.append('documentFormId', this.element.formId);

        TransactionService.docsFileSave(formData);
    },

    render(){
        let switchVal;
        let docs = UIService.getDocsFile();

        if(docs.kycIDApproved && !this.state.checkOption){
            let actualState = this.state;
            actualState.checkOption = docs.kycIDApproved;
            this.setState(actualState);
            switchVal = docs.kycIDApproved;
        }else{
            switchVal = this.state.checkOption
        }

        let disabledSwitch = (docs.kycIDApproved) ? 'disabled' : '';
        if(docs.customerForms && !this.state.addDocument){
            return <DocsVerifyIDCustomerForms forms={docs.customerForms} addDocument={this.addDocument}/>
        }

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
                    {translate('DOCS_FILE_VERIFY_IMPORTANT_TXT')}
                </div>

                <div className="OptTittle">
                    <span>{translate('MY_REQUEST_DOCS_OPTION_ID_TXT')}</span>
                    <span className="switch"/>
                    <span>{translate('MY_REQUEST_DOCS_OPTION_VE_EW_TXT')}</span>
                </div>

                <div id="switchOpt">
                    <label className="switch">
                        <input type="checkbox" onChange={this.switchVerifyType} disabled={disabledSwitch} checked={switchVal}/>
                        <span className="slider round"/>
                    </label>
                </div>

                {(() =>{
                    let ele = this.element;
                    let src = "../images/"+ this.element.idDocumentOption.name +".png";
                    if(!this.state.verifyIdOptSelect && !this.state.checkOption){
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
                                    src={src}
                                    id={ele.idDocumentOption.name}
                                    className="docsFilesVerifyIdOptions"
                                    onClick={this.verifyIdOptionsChange}
                                    alt={translate('DOCS_FILE_VERIFY_OPTIONS_DOCUMENT_ID')}
                                    title={translate('DOCS_FILE_VERIFY_OPTIONS_DOCUMENT_ID')}
                                />
                            </div>
                        )
                    }
                })()}

                {(() =>{
                    if(this.state.verifyIdOptSelect || this.state.checkOption){
                        return(
                            <div id="DrawDropUploadElement">
                                <DrawDropUpload action={this.uploadCurrentFiles} files={this.setFiles} multiple="true"/>
                            </div>
                        )
                    }
                })()}
            </div>
        )
    },

    /**
     * React function to add listener to this component once is mounted
     * here the component listen changes from the store
     */
    componentDidMount(){
        CashierStore.addChangeListener(this._onChange);
    },

    /**
     * React function to remove listener to this component once is unmounted
     */
    componentWillUnmount(){
        CashierStore.removeChangeListener(this._onChange);
    }
});

module.exports.DocsOptRecovery = DocsOptRecovery;