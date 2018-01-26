import React from 'react'
import {translate} from '../../../constants/Translate'

let DocsOptVerifyIdentity = React.createClass({
    render(){
        return(
            <div id="CheckIdContent">
                <p className="title text-center">{translate('MY_REQUEST_VERIFY_TITLE')}</p>

                <div id="switchOpt">
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className="OptTittle">
                    <span>{translate('MY_REQUEST_DOCS_OPTION_ID_TXT')}</span>
                    <span className="switch"/>
                    <span>{translate('MY_REQUEST_DOCS_OPTION_VE_EW_TXT')}</span>
                </div>

                <div id="DrawDropUploadContent">
                    <form id="DrawDropUpload">
                        <input type="file" multiple/>
                        <p>Drag your files here or click in this area.</p>
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        )
    }
});

module.exports.DocsOptVerifyIdentity = DocsOptVerifyIdentity;