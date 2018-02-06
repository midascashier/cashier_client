import React from 'react'
import {Fragment} from 'react'
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
            <Fragment>
                <span className="grid-item">{translate(element.TagTitle)}</span>
                <span className="grid-item">{translate(element.DateCreated)}</span>
                <span className="grid-item">{translate('DOCS_FILE_STATUS_' + element.caDocumentStatus_Id)}</span>
                <input type="button" value="Boton" className="grid-item" onClick={this.editRequest}/>
            </Fragment>
        )
    },

    render(){
        return (
            <div className="grid-container">
                {this.props.forms.map(this.genDocumentRegisters)}
            </div>
        )
    }
});

module.exports.DocsVerifyIDCustomerForms = DocsVerifyIDCustomerForms;