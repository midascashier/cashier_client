import React from 'react'
import {DocsOptRecovery} from './DocsOptRecovery'
import {UIService} from '../../../services/UIService'
import {DocsOptUpdateInfo} from './DocsOptUpdateInfo'
import {DocsOptReportError} from './DocsOptReportError'
import {DocsOptAdditionalInfo} from './DocsOptAdditionalInfo'
import {DocsOptVerifyIdentity} from './DocsOptVerifyIdentity'

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

    render(){
        let docs = UIService.getDocsFile();
        if(docs.readyPending){
            let Component = this.rendering[this.props.content];
            return <Component elements={this.props.elements}/>
        }

        return <div className="loader"></div>
    }
});

module.exports.DocsFormRequestContent = DocsFormRequestContent;