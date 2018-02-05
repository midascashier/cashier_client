import React from 'react'

let DocsUploadErrorResponse = React.createClass({
    render(){
        return(
            <div id="DocsUploadSuccessResponse">
                <img src="/images/check2.svg"/>
                <span>{translate('DOCS_FILE_UPLOAD_ERROR_RESPONSE')}</span>
                <p>{translate('DOCS_FILE_UPLOAD_SUCCESS_NOTIFIED_')}</p>
            </div>
        )
    }
});

module.exports.DocsUploadErrorResponse = DocsUploadErrorResponse;