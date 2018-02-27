import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {DrawDropUpload} from '../../../components/commonComponents/files/DrawDropUpload'

let DocsFileGenerateInputsType = React.createClass({
    propType : {
        state : React.PropTypes.func,
        optionInfo : React.PropTypes.node,
        updateState : React.PropTypes.func,
        switchAction : React.PropTypes.func,
        optionsSwitch : React.PropTypes.object
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
        let actualState = this.props.state();
        actualState.files = files;
        this.props.updateState(actualState);
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
    },

    /**
     * Generate current options form
     *
     * @param element
     * @returns {XML}
     */
    generateOptions(element){
        let src = UIService.docsFileGetSrcImg(element);

        return(
            <img
                src={src}
                id={element.fileTypeId}
                onClick={this.optionAction}
                className="docsFilesOptions"
                alt={translate(element.label)}
                title={translate(element.label)}
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
        let req = (element.Required == '1') ? 'required' : '';
        switch(element.caDocumentFormInputType_Id){
            case this.inputsType.file:
                return(
                    <div id="DrawDropUploadElement">
                        <DrawDropUpload
                            required={req}
                            multiple="true"
                            files={this.setFiles}
                            action={this.uploadCurrentFiles}
                            inputId={element.caDocumentFormInput_Id}
                        />
                    </div>
                );
            break;

            case this.inputsType.text:
                return (
                    <div className="docsFileInputText">
                        <input id={element.caDocumentFormInput_Id} type="text" placeholder={translate(element.label)} required={req}/>
                    </div>
                );
            break;

            case this.inputsType.selected:
                return (
                    <div className="docsFileInputSelected">
                        <span>{translate(element.label)}</span>
                        <select id={element.caDocumentFormInput_Id} required={req}>
                            {element.options.map(function (val) {
                                return <option id={val.caDocumentFormInputOption_Id} value={val.caDocumentFormInputOption_Id}>{translate(val.OptionValueCode)}</option>
                            })}
                        </select>
                    </div>
                );
            break;

            case this.inputsType.ccList:
                return (
                    <select id={element.caDocumentFormInput_Id}>
                        {element.options.map(function (val) {
                            return <option id={val.caDocumentFormInputOption_Id} value={val.caDocumentFormInputOption_Id}>{translate(val.OptionValueCode)}</option>
                        })}
                    </select>
                );
            break;

            case this.inputsType.eWalletList:
                return (
                    <select id={element.caDocumentFormInput_Id}>
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
        let docs = UIService.getDocsFile();
        let className = (state.checkOption) ? 'docsFilesInputContent' : 'docsFilesOptionsContent';

        if(this.props.optionInfo.hasOwnProperty('files')){
            if(this.props.optionInfo.files.length){
                if(!state.checkOption){
                    if(element.step == docs.currentStep){
                        return(
                            <div className={className}>
                                {element.files.map(this.generateOptions)}
                            </div>
                        )
                    }
                }
            }
        }

        if(element.step == docs.currentStep){
            state.checkOption = true;

            return(
                <div className={className}>
                    {this.generateInputs(element)}
                </div>
            )
        }

        return (null);
    },

    render(){
        return this.printInputs(this.props.optionInfo)
    },

    /**
     * Execute actions when this component did mount
     */
    componentDidMount(){
        let state = this.props.state();
        if(state.customerFormId){
            let customerForm = UIService.docsFileGetCustomerDocumentForm(state.customerFormId, state.option);

            if(this.props.optionsSwitch.hasOwnProperty(customerForm.caDocumentForm_Id)){
                let checked = this.props.optionsSwitch[customerForm.caDocumentForm_Id];
                this.props.switchAction(null, checked);
            }
        }

        this.props.updateState(state)
    }
});

module.exports.DocsFileGenerateInputsType = DocsFileGenerateInputsType;