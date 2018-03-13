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
     * Edit input set value
     * 
     * @param e
     */
    editValue(e){
        let id = e.target.id;
        let value = e.target.value;
        let actualState = this.state;

        actualState.editObj = {
            input: id,
            value: value
        };

        actualState.editMode = true;
        this.props.updateState(actualState)
    },

    /**
     * Selected option from verify ID type
     *
     * @param e
     */
    optionAction(e){
        let docs = UIService.getDocsFile();
        let actualState = this.props.state();

        docs.checkOption = true;
        actualState.idOptSelect = e.target.getAttribute('id');
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
     * Get current value for input id
     *
     * @param values
     * @param inputId
     * @returns {*}
     */
    getInputValue(values, inputId){
        for(let input in values){
            if(values.hasOwnProperty(input)){
                if(values[input].caDocumentFormInput_Id == inputId){
                    return values[input].FormValue
                }
            }
        }

        return null
    },

    /**
     * Generate current inputs form
     * 
     * @param element
     * @returns {XML}
     */
    generateInputs(element){
        let input;
        let state = this.props.state();
        let docs = UIService.getDocsFile();
        let req = (element.Required == '1') ? 'required' : '';

        let value = null;
        let values = null;
        if(state.customerFormId){
            if(state.editMode && state.editObj.input == element.caDocumentFormInput_Id){
                value = state.editObj.value
            }else{
                for(let currentValues in docs.customerForms[docs.currentOptionSelected]){
                    if(docs.customerForms[docs.currentOptionSelected].hasOwnProperty(currentValues)){
                        let current = docs.customerForms[docs.currentOptionSelected][currentValues];
                        if(current.caDocumentFormCustomer_Id == state.customerFormId){
                            values = docs.customerForms[docs.currentOptionSelected][currentValues].values;
                            break
                        }
                    }
                }

                value = this.getInputValue(values, element.caDocumentFormInput_Id);
            }
        }

        if(!docs.checkOption){
            docs.checkOption = true;
        }

        switch(element.caDocumentFormInputType_Id){
            case this.inputsType.file:
                let actualState = this.props.state();
                if(actualState.inputIdSelected != element.caDocumentFormInput_Id){
                    actualState.inputIdSelected = element.caDocumentFormInput_Id;
                    this.props.updateState(actualState);
                }

                input =(
                    <div id="DrawDropUploadElement">
                        <DrawDropUpload
                            required={req}
                            multiple="true"
                            files={this.setFiles}
                            inputId={element.caDocumentFormInput_Id}
                        />
                    </div>
                );
            break;

            case this.inputsType.text:
                input = (
                    <div className="docsFileInputText">
                        <input
                            type="text"
                            value={value}
                            required={req}
                            onInput={this.editValue}
                            id={element.caDocumentFormInput_Id}
                            placeholder={translate(element.label)}
                        />
                    </div>
                );
            break;

            case this.inputsType.selected:
                input = (
                    <div className="docsFileInputSelected">
                        <span>{translate(element.label)}</span>
                        <select id={element.caDocumentFormInput_Id} required={req}>
                            {element.options.map(function (val){
                                let selected = (val.caDocumentFormInputOption_Id == value) ? 'selected' : false;
                                return(
                                    <option id={val.caDocumentFormInputOption_Id} value={val.caDocumentFormInputOption_Id} selected={selected}>
                                        {translate(val.OptionValueCode)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                );
            break;

            case this.inputsType.ccList:
                if(element.hasOwnProperty('cc')){
                    input = (
                        <div className="docsFileInputSelected">
                            <span>{translate(element.label)}</span>
                            <select id={element.caDocumentFormInput_Id} required={req}>
                                {element.cc.map(function (val) {
                                    return(
                                        <option id={val.caPayAccount_Id} value={val.CardholderName + '(' + val.Account + ')'}>
                                            {val.CardholderName + '(' + val.Account + ')'}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    );
                }
            break;

            default: input = (null)
        }

        return input
    },

    /**
     * Print current inputs list
     *
     * @param element
     * @returns {XML}
     */
    printInputs(element){
        let docs = UIService.getDocsFile();
        let id = (docs.checkOption) ? 'docsFilesInputContent' : 'docsFilesOptionsContent';

        if(this.props.optionInfo.hasOwnProperty('files')){
            if(this.props.optionInfo.files.length){
                if(!docs.checkOption){
                    if(element.step == docs.currentStep){
                        if(element.files.length == 1){
                            if(element.files.hasOwnProperty(0)){
                                element.files[0] = {
                                    label: element.label,
                                    fileTypeId : element.files[0].fileTypeId
                                };
                            }
                        }

                        return(
                            <div id={id}>
                                {element.files.map(this.generateOptions)}
                            </div>
                        )
                    }
                }
            }
        }

        if(element.step == docs.currentStep){
            return(
                <div id={id}>
                    {this.generateInputs(element)}
                </div>
            )
        }

        return <span/>;
    },

    render(){
        return this.printInputs(this.props.optionInfo)
    },

    /**
     * Execute actions when this component did mount
     */
    componentDidUpdate(){
        let docs = UIService.getDocsFile();
        let state = this.props.state();
        if(state.customerFormId){
            let customerForm = UIService.docsFileGetCustomerDocumentForm(state.customerFormId, state.option);

            if(this.props.optionsSwitch.hasOwnProperty(customerForm.caDocumentForm_Id) && this.props.optionsSwitch.reset){
                let checked = this.props.optionsSwitch[customerForm.caDocumentForm_Id];
                this.props.switchAction(null, checked);

                this.props.optionsSwitch.reset = false;
            }
        }

        let twoOptions = (_.size(docs.forms[state.option]) == 2);
        if(twoOptions && !this.state.idOptSelect){
            let docsTxtElement = document.getElementById('docsFileTXT');
            if(docsTxtElement){
                docsTxtElement.style.marginTop = '60px';
            }
        }
    }
});

module.exports.DocsFileGenerateInputsType = DocsFileGenerateInputsType;