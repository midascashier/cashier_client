import React from 'react'
import {UIService} from '../../../services/UIService'
import {docsFileOptKyc} from './options/docsFileOptKyc'
import {ApplicationService} from '../../../services/ApplicationService'

let DocsFormRequestContent = React.createClass({
    propsType : {
        option : React.PropTypes.node
    },

    rendering : {
        docsFileOptKyc : docsFileOptKyc
    },

    render(){
        let docs = UIService.getDocsFile();
        if(!docs.forms.hasOwnProperty(this.props.option) && this.props.option){
            UIService.docFilesCustomerFormsInformation(this.props.option);
        }else{
            UIService.docFilesFormInputsCategories(this.props.option);
        }

        if(docs.readyPending()){
            let prefixComponent = 'docs file opt ' + this.props.option;
            let componentName = ApplicationService.toCamelCase(prefixComponent);

            let Component = this.rendering[componentName];
            return <Component elements={this.props.option}/>
        }

        return <div className="loader"></div>
    }
});

module.exports.DocsFormRequestContent = DocsFormRequestContent;