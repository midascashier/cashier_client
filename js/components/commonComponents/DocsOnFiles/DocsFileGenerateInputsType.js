import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'

let DocsFileGenerateInputsType = React.createClass({
    propType : {
        twoOptions : React.PropTypes.bool,
        optionInfo : React.PropTypes.node
    },

    inputsType : {
        file : '1',
        text : '2',
        selected : '3',
        ccList : '4',
        eWalletList : '5'
    },

    /**
     * Selected option from verify ID type
     *
     * @param e
     */
    verifyIdOptionsChange(e){
        let actualState = this.state;
        let option = e.target.getAttribute('id');
        actualState.idOptSelect = option;
        this.setState(actualState);
        UIService.docsFileSetOptionIdSelected(option);
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
        );
    },

    printInputs(element){
        switch(element.caDocumentFormInputType_Id){
            case this.inputsType.file:

            break;

            case this.inputsType.text:
                return <input type="text" placeholder={element.label}/>
            break;

            case this.inputsType.selected:
                return(
                    <select>
                        {element.map(function (option, value) {
                            return <option>{value}</option>
                        })}
                    </select>
                );
            break;

            case this.inputsType.ccList:
                return(
                    <select>
                        {element.map(function (option, value) {
                            return <option>{value}</option>
                        })}
                    </select>
                );
            break;

            case this.inputsType.eWalletList:
                return(
                    <select>
                        {element.map(function (option, value) {
                            return <option>{value}</option>
                        })}
                    </select>
                );
            break;
        }
    },

    render(){
        return(
            <div>
                {(() =>{
                    if(this.props.twoOptions){
                        return(
                            <div id="CheckIdVerifyOptions">
                                {this.props.optionInfo.map(this.generateOptions)}
                            </div>
                        )
                    }
                })()}

                {this.props.optionInfo.map(this.printInputs)}
            </div>
        )
    }
});

module.exports.DocsFileGenerateInputsType = DocsFileGenerateInputsType;