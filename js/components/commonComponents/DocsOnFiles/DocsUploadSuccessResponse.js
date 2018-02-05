import React from 'react'
import {translate} from '../../../constants/Translate'

let DocsUploadSuccessResponse = React.createClass({
    render(){
        return(
            <div id="DocsUploadSuccessResponse">
                <img src="/images/check1.svg"/>
                <span>{translate('DOCS_FILE_UPLOAD_SUCCESS_RESPONSE')}</span>
                <p>{translate('DOCS_FILE_UPLOAD_SUCCESS_NOTIFIED_')}</p>
            </div>
        )
    }
});

module.exports.DocsUploadSuccessResponse = DocsUploadSuccessResponse;