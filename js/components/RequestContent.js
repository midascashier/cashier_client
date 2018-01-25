import React from 'react'
import {translate} from '../constants/Translate'
import {DocsOptUpdateInfo} from '../components/commonComponents/DocsOnFiles/DocsOptUpdateInfo'
import {DocsOptReportError} from '../components/commonComponents/DocsOnFiles/DocsOptReportError'
import {DocsOptVerifyIdentity} from '../components/commonComponents/DocsOnFiles/DocsOptVerifyIdentity'

let RequestsContent = React.createClass({

    elements: {
        style: {
            optClickTab: '#1a8dea',
            optInitialTab: '#0b97c4'
        },

        DocsOptions: 'DocsOptions',
        DocsOptUpdInfo : 'DocsOptUpdateInfo',
        DocsOptVeId : 'DocsOptVerifyIdentity',
        DocsOptRepError : 'DocsOptReportError'
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {option: this.elements.DocsOptVeId}
    },

    optionContent(){
        switch(this.state.option){
            case this.elements.DocsOptVeId:
                return <DocsOptVerifyIdentity/>;
            break;

            case this.elements.DocsOptUpdInfo:
                return <DocsOptUpdateInfo/>;
            break;

            default:
                return <DocsOptReportError/>;
            break;
        }
    },

    docsOptionsActions(event){
        let optionElements = document.getElementsByClassName(this.elements.DocsOptions);
        let count = optionElements.length;

        for(let i=0; i<count; i++){
            optionElements[i].setAttribute('style', 'background-color:' + this.elements.style.optInitialTab);
        }

        let id = event.target.getAttribute('id');
        let element  = document.getElementById(id);
        element.setAttribute('style', 'background-color:'  + this.elements.style.optClickTab);

        this.setState({
            option: id
        });
    },

    render(){
        return(
            <div id="requestContent">
                <div className="internal-content">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="title text-center">{translate('MY_REQUEST_TITLE')}</div>
                            <div id="requestsOptions">
                                <div id={this.elements.DocsOptVeId} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_VERIFY_IDENTITY')}
                                </div>
                                <div id={this.elements.DocsOptUpdInfo} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_UPDATE_INFORMATION')}
                                </div>
                                <div id={this.elements.DocsOptRepError} className={this.elements.DocsOptions} onClick={this.docsOptionsActions}>
                                    {translate('MY_REQUEST_REPORT_PROBLEM')}
                                </div>
                            </div>
                            <div id="requestOptionContent">
                                {this.optionContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports.RequestsContent = RequestsContent;