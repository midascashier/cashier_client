import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {DrawDropUpload} from '../../../components/commonComponents/files/DrawDropUpload'

let DocsFileGenerateInputsType = React.createClass({
    propType : {
        state : React.PropTypes.func,
        optionInfo : React.PropTypes.node,
        updateState : React.PropTypes.func
    },

    inputsType : {
        file : '1',
        text : '2',
        selected : '3',
        ccList : '4',
        eWalletList : '5'
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return this.props.state()
    },

    /**
     * Set files selected to upload
     *
     * @param files
     */
    setFiles(files){
        let actualState = this.state;
        actualState.files = files;
        this.setState(actualState);
    },

    /**
     * Selected option from verify ID type
     *
     * @param e
     */
    optionAction(e){
        let actualState = this.props.state();
        let option = e.target.getAttribute('id');
        actualState.checkOption = true;
        actualState.idOptSelect = option;
        this.props.updateState(actualState);
        UIService.docsFileSetOptionIdSelected(option);
    },

    /**
     * Generate current options form
     *
     * @param element
     * @returns {XML}
     */
    generateOptions(element){
        let prefixAdd = 'docsFileOption';
        let currentElement = element.label.replace('BD_TEXT_TYPE_', '');
        let imgName = capitalize(currentElement.toLowerCase());

        return(
            <img
                id={element.fileTypeId}
                onClick={this.optionAction}
                className="docsFilesOptions"
                alt={translate(element.label)}
                title={translate(element.label)}
                src={"../images/"+ prefixAdd + imgName +".svg"}
            />
        );
    },

    /**
     * Generate current inputs form
     * 
     * @param element
     * @returns {XML}
     */
    generateInputs(element){
        switch(element.caDocumentFormInputType_Id){
            case this.inputsType.file:
                return(
                    <div id="DrawDropUploadElement">
                        <DrawDropUpload action={this.uploadCurrentFiles} files={this.setFiles} multiple="true"/>
                    </div>
                );
            break;

            case this.inputsType.text:
                return (<input type="text" placeholder={translate(element.label)}/>);
            break;

            case this.inputsType.selected:
                return (
                    <div>
                        <span>{translate(element.label)}</span>
                        <select>
                            {element.options.map(function (val) {
                                return <option id={val.caDocumentFormInputOption_Id} value={val.caDocumentFormInputOption_Id}>{translate(val.OptionValueCode)}</option>
                            })}
                        </select>
                    </div>
                );
            break;

            case this.inputsType.ccList:
                return (
                    <select>
                        {element.options.map(function (val) {
                            return <option id={val.caDocumentFormInputOption_Id} value={val.caDocumentFormInputOption_Id}>{translate(val.OptionValueCode)}</option>
                        })}
                    </select>
                );
            break;

            case this.inputsType.eWalletList:
                return (
                    <select>
                        {element.options.map(function (val) {
                            return <option id={val.caDocumentFormInputOption_Id} value={val.caDocumentFormInputOption_Id}>{translate(val.OptionValueCode)}</option>
                        })}
                    </select>
                );
            break
        }
    },

    /**
     * Print current inputs list
     * 
     * @param element
     * @returns {XML}
     */
    printInputs(element){
        let state = this.props.state();

        return (
            <div className="docsFilesField">
                {(() =>{
                    if(this.props.optionInfo.hasOwnProperty('files')){
                        if(this.props.optionInfo.files.length && !state.checkOption){
                            return element.files.map(this.generateOptions)
                        }
                    }
                })()}

                {(() =>{
                    if(state.checkOption){
                        return this.generateInputs(element)
                    }
                })()}
            </div>
        )
    },

    render(){
        return this.printInputs(this.props.optionInfo)
    }
});

module.exports.DocsFileGenerateInputsType = DocsFileGenerateInputsType;