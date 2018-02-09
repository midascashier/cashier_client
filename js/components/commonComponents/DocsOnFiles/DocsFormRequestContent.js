import React from 'react'
import {DocsOptRecovery} from './DocsOptRecovery'
import {UIService} from '../../../services/UIService'
import {DocsOptUpdateInfo} from './DocsOptUpdateInfo'
import {translate} from '../../../constants/Translate'
import {DocsOptReportError} from './DocsOptReportError'
import {DocsOptAdditionalInfo} from './DocsOptAdditionalInfo'
import {DocsOptVerifyIdentity} from './DocsOptVerifyIdentity'
import {ApplicationService} from '../../../services/ApplicationService'

let DocsFormRequestContent = React.createClass({

    propsType: {
        content: React.PropTypes.node
    },

    rendering: {
        DocsOptRecovery,
        DocsOptUpdateInfo,
        DocsOptReportError,
        DocsOptAdditionalInfo,
        DocsOptVerifyIdentity
    },

    /**
     * Build and set current elements forms
     *
     * @returns {{}}
     */
    currentElements(){
        let docs = UIService.getDocsFile();

        let formOptions = {};
        let options = docs.forms;

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
    },

    render(){
        let docs = UIService.getDocsFile();
        if(docs.readyPending){
            let elements = this.currentElements();
            let Component = this.rendering[this.props.content];
            return <Component elements={elements}/>
        }

        return <div className="loader"></div>
    }
});

module.exports.DocsFormRequestContent = DocsFormRequestContent;