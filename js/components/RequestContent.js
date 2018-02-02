import React from 'react'
import {UIService} from '../services/UIService'
import {translate} from '../constants/Translate'
import {CashierStore} from '../stores/CashierStore'
import {DocsOptRecovery} from '../components/commonComponents/DocsOnFiles/DocsOptRecovery'
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

        DocsOptions: 'DocsOptions',
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
        return this.refreshLocalState();
    },

    /**
     * this function sets and return object with local states
     */
    refreshLocalState(){
        let docFile = UIService.getDocsFile();

        return {
            option: this.elements.DocsOptVeId,
            recovery: docFile.pendingRecovery,
            additionalInfo: docFile.pendingAdditionalInfo
        }
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
    },

    /**
     * Selected current content from tab selected
     * 
     * @returns {XML}
     */
    optionContent(){
        switch(this.state.option){
            case this.elements.DocsOptVeId:
                return <DocsOptVerifyIdentity/>;
            break;

            case this.elements.DocsOptUpdInfo:
                return <DocsOptUpdateInfo/>;
            break;

            case this.elements.DocsOptRepError:
                return <DocsOptReportError/>;
            break;

            case this.elements.DocsOptAdditionalInfo:
                return <DocsOptAdditionalInfo/>;
            break;

            case this.elements.DocsOptRecovery:
                return <DocsOptRecovery/>;
            break;
        }
    },

    /**
     * Execute action on click tab option
     * 
     * @param event
     */
    docsOptionsActions(event){
        let optionElements = document.getElementsByClassName(this.elements.DocsOptions);
        let count = optionElements.length;

        for(let i=0; i<count; i++){
            optionElements[i].setAttribute('class', 'DocsOptions');
        }

        let id = event.target.getAttribute('id');
        let element  = document.getElementById(id);
        element.setAttribute('class', 'DocsOptions DocsOptionsClick');

        this.setState({
            option: id
        });
    },

    render(){
        return(
            <div id="requestContent">
                <div id="requestsOptions">
                    <div id={this.elements.DocsOptVeId} className={this.elements.DocsOptionsInitial} onClick={this.docsOptionsActions}>
                        {translate('MY_REQUEST_VERIFY_IDENTITY')}
                    </div>
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
                                   {translate('MY_REQUEST_REPORT_PROBLEM')}
                               </div>
                           )
                        }
                    })()}

                    {(() =>{
                        if(this.state.recovery){
                            return(
                                <div id={this.elements.DocsOptRecovery} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_REPORT_PROBLEM')}
                                </div>
                            )
                        }
                    })()}
                </div>
                <div id="requestOptionContent">
                    {this.optionContent()}
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