import React from 'react'
import {translate} from '../constants/Translate'
import {DocsOptUpdateInfo} from '../components/commonComponents/DocsOnFiles/DocsOptUpdateInfo'
import {DocsOptReportError} from '../components/commonComponents/DocsOnFiles/DocsOptReportError'
import {DocsOptVerifyIdentity} from '../components/commonComponents/DocsOnFiles/DocsOptVerifyIdentity'

let RequestsContent = React.createClass({

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {option: 'DocsOptVerifyIdentity'}
    },

    optionContent(){
        let option = this.state.option;
        switch(option){
            case 'DocsOptVerifyIdentity':
                return <DocsOptVerifyIdentity/>;
            break;

            case 'DocsOptUpdateInfo':
                return <DocsOptUpdateInfo/>;
            break;

            default:
                return <DocsOptReportError/>;
            break;
        }
    },

    docsOptionsActions(event){
        let optionElements = document.getElementsByClassName('DocsOptions');
        let count = optionElements.length;

        for(let i=0; i<count; i++){
            optionElements[i].setAttribute('style', 'background-color: #0b97c4');
        }

        let id = event.target.getAttribute('id');
        let element  = document.getElementById(id);
        element.setAttribute('style', 'background-color: #1a8dea');

        this.setState({
            option: id
        });
    },

    render(){
        let optionContent = this.optionContent();

        return(
            <div id="requestContent">
                <div className="internal-content">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="title text-center">{translate('MY_REQUEST_TITLE')}</div>
                            <div id="requestsOptions">
                                <div id="DocsOptVerifyIdentity" className="DocsOptions" onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_VERIFY_IDENTITY')}
                                </div>
                                <div id="DocsOptUpdateInfo" className="DocsOptions" onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_UPDATE_INFORMATION')}
                                </div>
                                <div id="DocsOptReportError" className="DocsOptions" onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_REPORT_PROBLEM')}
                                </div>
                            </div>
                            <div id="requestOptionContent">
                                {optionContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports.RequestsContent = RequestsContent;