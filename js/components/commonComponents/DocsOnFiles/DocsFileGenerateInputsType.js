import React from 'react'
import {translate} from '../../../constants/Translate'

let DocsFileGenerateInputsType = React.createClass({
    propType : {
        optionInfo : React.PropTypes.node
    },

    /**
     * Selected option from verify ID type
     *
     * @param e
     */
    verifyIdOptionsChange(e){
        let actualState = this.state;
        let option = e.target.getAttribute('id');
        actualState.verifyIdOptSelect = option;
        actualState.valueOption = this.element[option].value;
        this.setState(actualState);
    },

    /**
     * Generate current options form
     *
     * @param element
     * @returns {XML}
     */
    generateOptions(element){
        return(
            <img
                id={element.fileTypeId}
                className="docsFilesOptions"
                onClick={this.verifyIdOptionsChange}
                src="../images/driverLicenseOption.png"
                alt={translate('DOCS_FILE_VERIFY_OPTIONS_DRIVER_ID')}
                title={translate('DOCS_FILE_VERIFY_OPTIONS_DRIVER_ID')}
            />
        )
    },

    render(){
        if(this.props.optionInfo.fields.length){
            return(
                <div id="CheckIdVerifyOptions">
                    {this.props.optionInfo.fields.map(this.generateOptions)}
                </div>   
            )
        }

        return(
            <p>test</p>
        )
    }
});

module.exports.DocsFileGenerateInputsType = DocsFileGenerateInputsType;