import React from 'react'
import {translate} from '../../../constants/Translate'

let DocsVerifyIDCustomerForms = React.createClass({

    propTypes: {
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
                <input type="button" value="Boton" className="grid-item" onClick={this.editRequest}/>
            </div>
        )
    },

    render(){
        return (
            <div id="DocsFileCustomerFormsContent">
                <div id="DocsFileCustomerFormsHeader" className="grid-container">
                    <span className="grid-item">Document</span>
                    <span className="grid-item">Created Date</span>
                    <span className="grid-item">Status</span>
                    <span className="grid-item">Action</span>
                </div>
                <div className="grid-global-container">
                    {this.props.forms.map(this.genDocumentRegisters)}
                </div>
            </div>
        )
    }
});

module.exports.DocsVerifyIDCustomerForms = DocsVerifyIDCustomerForms;