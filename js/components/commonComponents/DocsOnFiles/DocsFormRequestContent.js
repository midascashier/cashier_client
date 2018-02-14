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
        if(!docs.forms.hasOwnProperty(this.props.option)){
            UIService.docFilesCustomerFormsInformation(this.props.option);
        }

        if(!docs.currentFormInputsCategories.hasOwnProperty(this.props.option)){
            UIService.docFilesFormInputsCategories(this.props.option);
        }

        if(docs.readyPending()){
            let prefixComponent = 'docs file opt';//Standard name for dynamic call to the component of the selected option
            let componentName = ApplicationService.toCamelCase(prefixComponent);//docsFileOpt + NameOption

            let Component = this.rendering[componentName + capitalize(this.props.option, true)];
            return <Component/>
        }

        return <div className="loader"></div>
    }
});

module.exports.DocsFormRequestContent = DocsFormRequestContent;