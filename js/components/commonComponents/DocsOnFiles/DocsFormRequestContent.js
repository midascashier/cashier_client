import React from 'react'
import Cashier from '../../../constants/Cashier'
import {DocsOptRecovery} from './DocsOptRecovery'
import {UIService} from '../../../services/UIService'
import {DocsOptUpdateInfo} from './DocsOptUpdateInfo'
import {DocsOptReportError} from './DocsOptReportError'
import {DocsOptAdditionalInfo} from './DocsOptAdditionalInfo'
import {DocsOptVerifyIdentity} from './DocsOptVerifyIdentity'
import {DrawDropUpload} from '../files/DrawDropUpload'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {DocsVerifyIDCustomerForms} from './DocsVerifyIDCustomerForms'
import {TransactionService} from '../../../services/TransactionService'

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

    elements: {
        Label: '',
        Required: '',
        caDocumentFormInput_Id: 0,
        caDocumentFormInputType_Id: 0,

        types: {}
    },

    form: {
        TagTitle: '',
        TagDescription: '',
        caDocumentForm_Id: 0,
        caDocumentCategory_Id: 0,
        elements: {}
    },

    currentElements(){
        let docs = UIService.getDocsFile();

        let options = {};
        for(let form in docs.forms){
            let element = {
                TagTitle: '',
                TagDescription: '',
                caDocumentForm_Id: '',
                caDocumentCategory_Id: '',
                elements: {}
            };

            element.TagTitle = docs.forms[form].TagTitle;
            element.TagDescription = docs.forms[form].TagDescription;
            element.caDocumentForm_Id = docs.forms[form].caDocumentForm_Id;
            element.caDocumentCategory_Id = docs.forms[form].caDocumentCategory_Id;
            element.elements = docs.forms[form].fields;

            options[form] = element;
        }

        return options;
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