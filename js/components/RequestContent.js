import React from 'react'
import {Link} from 'react-router'
import {UIService} from '../services/UIService'
import {translate} from '../constants/Translate'
import {CashierStore} from '../stores/CashierStore'
import {ApplicationService} from '../services/ApplicationService'
import {DocsOptRecovery} from '../components/commonComponents/DocsOnFiles/DocsOptRecovery'
import {DocsFormRequestContent} from './commonComponents/DocsOnFiles/DocsFormRequestContent'
import {DocsOptUpdateInfo} from '../components/commonComponents/DocsOnFiles/DocsOptUpdateInfo'
import {DocsOptReportError} from '../components/commonComponents/DocsOnFiles/DocsOptReportError'
import {DocsOptAdditionalInfo} from '../components/commonComponents/DocsOnFiles/DocsOptAdditionalInfo'
import {DocsOptVerifyIdentity} from '../components/commonComponents/DocsOnFiles/DocsOptVerifyIdentity'

let RequestsContent = React.createClass({

    elements: {
        style: {
            optClickTab: '#D5232F',
            optInitialTab: '#A51419'
        },

        DocsOptions : 'DocsOptions',
        DocsOptRecovery : 'DocsOptRecovery',
        DocsOptUpdInfo : 'DocsOptUpdateInfo',
        DocsOptVeId : 'DocsOptVerifyIdentity',
        DocsOptRepError : 'DocsOptReportError',
        DocsOptAdditionalInfo : 'DocsOptAdditionalInfo',
        DocsOptionsInitial : 'DocsOptions DocsOptionsClick'
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        let docFile = UIService.getDocsFile();

        return {
            option: this.elements.DocsOptVeId,
            recovery: docFile.pendingRecovery,
            kycIDApproved: docFile.kycIDApproved,
            additionalInfo: docFile.pendingAdditionalInfo,
            responseUpload: UIService.getDocsUploadResponse(),
            forms: this.customerFormsInformation(docFile.forms)
        }
    },

    /**
     * Refresh local state
     * 
     * @returns {*|{forms, option, recovery, kycIDApproved, additionalInfo, responseUpload}}
     */
    refreshLocalState(){
        let refreshState = this.getInitialState();
        refreshState.option = this.state.option;

        return refreshState
    },

    /**
     * this is the callback function the store calls when a state change
     *
     * @private
     */
    _onChange(){
        this.setState(this.refreshLocalState());
    },

    /**
     * Execute actions when component will mount
     */
    componentWillMount(){
        UIService.docFilesCustomerPendingForms();
        UIService.docFilesCustomerFormsInformation(this.state.option)
    },

    /**
     * Build and set current elements forms
     *
     * @returns {{}}
     */
    customerFormsInformation(options){
        if(_.size(options)){
            let formOptions = {};
            for(let option in options){
                let form = {};
                let currentOpt = options[option];
                let category = translate(currentOpt.TagTitle);

                form[category] = {};
                form[category]['elements'] = {};
                form[category]['DocumentForm_Id'] = {};
                form[category]['DocumentForm_Id'] = currentOpt.caDocumentForm_Id;

                for(let element in currentOpt.fields){
                    form[category]['elements'][element] = currentOpt.fields[element];
                    form[category]['elements'][element].file = currentOpt.fields[element].file.types;
                }

                formOptions[ApplicationService.toCamelCase(category)] = form[category];
            }

            return formOptions;
        }

        return false;
    },

    /**
     * Execute action on click tab option
     * 
     * @param event
     */
    docsOptionsActions(event){
        UIService.docsResetResponseUpload();

        let optionElements = document.getElementsByClassName(this.elements.DocsOptions);
        let count = optionElements.length;

        for(let i=0; i<count; i++){
            optionElements[i].setAttribute('class', 'DocsOptions');
        }

        let id = event.target.getAttribute('id');
        let element  = document.getElementById(id);
        element.setAttribute('class', 'DocsOptions DocsOptionsClick');

        let actualState = this.state;
        actualState.option = id;
        actualState.responseUpload = UIService.getDocsUploadResponse();
        this.setState(actualState);
        UIService.docFilesCustomerFormsInformation(id);
    },

    render(){
        return(
            <div id="requestContent">
                <div id="requestsOptions">
                    {(() =>{
                        if(true){//TODO no form e-WALLET CALLED !this.state.kycIDApproved && !this.state.forms
                            return(
                                <div id={this.elements.DocsOptVeId} className={this.elements.DocsOptionsInitial} onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_VERIFY_IDENTITY')}
                                </div>
                            )
                        }
                    })()}

                    <div id={this.elements.DocsOptUpdInfo} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                        {translate('MY_REQUEST_UPDATE_INFORMATION')}
                    </div>
                    <div id={this.elements.DocsOptRepError} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                        {translate('MY_REQUEST_REPORT_PROBLEM')}
                    </div>

                    {(() =>{
                        if(this.state.additionalInfo){
                           return(
                               <div id={this.elements.DocsOptAdditionalInfo} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                                   {translate('MY_REQUEST_ADDITIONAL_INFO')}
                               </div>
                           )
                        }
                    })()}

                    {(() =>{
                        if(this.state.recovery){
                            return(
                                <div id={this.elements.DocsOptRecovery} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_RECOVERY')}
                                </div>
                            )
                        }
                    })()}

                    <div id="DocsFileBack">
                        <Link to={`/deposit/`}>
                            <span>{translate('DOCS_FILE_GO_HOME')}</span>
                        </Link>
                    </div>
                </div>
                <div id="requestOptionContent">
                    <DocsFormRequestContent content={this.state.option} elements={this.state.forms}/>
                </div>
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

module.exports.RequestsContent = RequestsContent;