import React from 'react'
import {DrawDropUpload} from '../files/DrawDropUpload'
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

                <DrawDropUpload/>
            </div>
        )
    }
});

module.exports.DocsOptVerifyIdentity = DocsOptVerifyIdentity;