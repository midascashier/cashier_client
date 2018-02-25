import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'

let DocsVerifyIDCustomerForms = React.createClass({

    propTypes: {
        forms : React.PropTypes.object,
        addDocument: React.PropTypes.func
    },

    /**
     * Edit current request selected
     */
    editRequest(e){
        let customerFormId = e.currentTarget.id;
        this.props.addDocument(customerFormId);
    },

    /**
     * Generate table with files send
     * 
     * @param element
     * @returns {XML}
     */
    genDocumentRegisters(element){
        let actionBTN = (element.caDocumentStatus_Id == 4) ? <input id={element.caDocumentFormCustomer_Id} type="button" value={translate('DOCS_FILE_EDIT_BTN')} className="grid-item" onClick={this.editRequest}/> : <span className="grid-item">-- --</span>;

        return (
            <div className="grid-container">
                <span className="grid-item">{translate(element.TagTitle)}</span>
                <span className="grid-item">{translate(element.DateCreated)}</span>
                <span className="grid-item">{translate('DOCS_FILE_STATUS_' + element.caDocumentStatus_Id)}</span>
                {actionBTN}
            </div>
        )
    },

    render(){
        let docs = UIService.getDocsFile();
        return (
            <div id="DocsFileCustomerFormsContent">
                <div className="docsFileBackOptId" onClick={this.editRequest}>
                    {translate('DOCS_FILE_VERITY_ADD_DOCUMENT')}
                </div>
                <div id="DocsFileCustomerFormsHeader" className="grid-container">
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_DOCUMENT')}</span>
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_CREATED_DATE')}</span>
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_STATUS')}</span>
                    <span className="grid-item">{translate('DOCFILE_FORM_KYC_TABLE_ACTION')}</span>
                </div>
                <div className="grid-global-container">
                    {this.props.forms[docs.currentOptionSelected].map(this.genDocumentRegisters)}
                </div>
            </div>
        )
    }
});

module.exports.DocsVerifyIDCustomerForms = DocsVerifyIDCustomerForms;