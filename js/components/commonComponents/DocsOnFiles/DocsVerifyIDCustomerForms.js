import React from 'react'
import {translate} from '../../../constants/Translate'

let DocsVerifyIDCustomerForms = React.createClass({

    propTypes: {
        addDocument: React.PropTypes.bool,
        forms : React.PropTypes.object
    },

    editRequest(){
        alert('Edit')
    },

    genDocumentRegisters(element){
        return (
            <div className="grid-container">
                <span className="grid-item">{translate(element.TagTitle)}</span>
                <span className="grid-item">{translate(element.DateCreated)}</span>
                <span className="grid-item">{translate('DOCS_FILE_STATUS_' + element.caDocumentStatus_Id)}</span>
                <input type="button" value={translate('DOCS_FILE_EDIT_BTN')} className="grid-item" onClick={this.editRequest}/>
            </div>
        )
    },

    render(){
        return (
            <div id="DocsFileCustomerFormsContent">
                <div className="docsFileBackOptId" onClick={this.props.addDocument}>
                    {translate('DOCS_FILE_VERITY_ADD_DOCUMENT')}
                </div>
                <div id="DocsFileCustomerFormsHeader" className="grid-container">
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_DOCUMENT')}</span>
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_CREATED_DATE')}</span>
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_STATUS')}</span>
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_ACTION')}</span>
                </div>
                <div className="grid-global-container">
                    {this.props.forms.map(this.genDocumentRegisters)}
                </div>
            </div>
        )
    }
});

module.exports.DocsVerifyIDCustomerForms = DocsVerifyIDCustomerForms;