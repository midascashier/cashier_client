import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {TransactionService} from '../../../services/TransactionService'
import {DocsFileGenerateInputsType} from './DocsFileGenerateInputsType'
import {DocsVerifyIDCustomerForms} from './DocsFilesSendedCustomerForms'

let DocsFormRequestContent = React.createClass({

    propsType : {
        option : React.PropTypes.node
    },

    optionsSwitch : {},

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {
            files : false,
            switchForm : false,
            idOptSelect : null,
            checkOption : false,
            newDocument : false,
            customerFormId : '',
            sendingFile : false,
            option : this.props.option
        }
    },

    /**
     * Return current actual form state
     *
     * @returns {*}
     */
    getActualState(){
        return this.state;
    },

    /**
     * Update actual state form params
     */
    updateActualState(updateState){
        this.setState(updateState);
    },

    /**
     * Form action request
     */
    action(e){
        e.preventDefault();

        let actualState = this.state;
        let docs = UIService.getDocsFile();

        if(docs.currentStep < docs.step){
            docs.step = 0;
            ++docs.currentStep;
            actualState.checkOption = false;
        }else{
            let inputs = e.currentTarget;
            let formData = new FormData();
            for(let input in inputs){
                if(inputs.hasOwnProperty(input)){
                    let elementInformation = {
                        value : null
                    };

                    if(inputs[input].type == 'file'){
                        let files = this.state.files;
                        for(let key in files){
                            if(files.hasOwnProperty(key)){
                                formData.append(inputs[input].id + '[]', files[key]);
                            }
                        }

                        formData.append('countExtraFiles', files.length);
                        elementInformation['value'] = inputs[input].value;
                        elementInformation['fileType'] = this.state.idOptSelect;
                        formData.append('input[' + inputs[input].id + ']', JSON.stringify(elementInformation));
                    }else{
                        if(inputs[input].type == 'text' || inputs[input].type == 'select-one'){
                            elementInformation.value = inputs[input].value;
                            formData.append('input[' + inputs[input].id + ']', JSON.stringify(elementInformation));
                        }
                    }
                }
            }

            let customer = UIService.getCustomerInformation();

            formData.append('actionType', 'save');
            formData.append('userName', customer.username);
            formData.append('companyId', customer.companyId);
            formData.append('customerId', customer.customerId);
            formData.append('documentFormId', docs.formSelectedId);
            formData.append('documentFormCustomerId', this.state.customerFormId);

            actualState.sendingFile = true;
            TransactionService.docsFileSave(formData);
        }

        this.setState(actualState);
    },

    /**
     * Set selected option expected
     */
    selectedIdForm(){
        let docs = UIService.getDocsFile();
        for(let option in docs.forms[this.props.option]){
            if(docs.forms[this.props.option].hasOwnProperty(option)){
                if(docs.forms[this.props.option][option].caDocumentForm_Id != UIService.docFilesGetFormSelectedId()){
                    UIService.docFilesSetFormSelectedId(docs.forms[this.props.option][option].caDocumentForm_Id);
                    break
                }
            }
        }
    },

    /**
     * Restart states option selected
     */
    optionReset(){
        let state = this.getInitialState();
        state.switchForm = this.state.switchForm;
        this.setState(state);
    },

    /**
     * Add new document
     */
    addDocument(customerFormId){
        let actualState = this.state;

        actualState.newDocument = true;
        actualState.customerFormId = customerFormId;

        this.setState(actualState);
    },

    /**
     * Change type ID form
     * 
     * @param e
     * @param force
     */
    switchFormType(e, force){
        let switchForm;
        let actualState;
        let docs =UIService.getDocsFile();
        docs.currentStep = 1;

        if(!e){
            if(force !== null){
                let customerForm = UIService.docsFileGetCustomerDocumentForm(this.state.customerFormId, this.state.option);

                actualState  = this.getActualState();
                switchForm = force;
                actualState.idOptSelect = null;
                actualState.checkOption = false;
                UIService.docFilesSetFormSelectedId(customerForm.caDocumentForm_Id);
            }
        }else{
            this.selectedIdForm();
            actualState  = this.getInitialState();
            switchForm = e.target.checked;
        }

        actualState.newDocument = true;
        actualState.switchForm = switchForm;
        this.setState(actualState);
    },

    /**
     * Generate Form options
     *
     * @returns {XML}
     */
    generateForm(field){
        let docs = UIService.getDocsFile();

        if(docs.formSelectedId){
            let input = {
                files: [],
                options: [],
                step : null,
                label : field.Label,
                Required : field.Required,
                caDocumentFormInput_Id : field.caDocumentFormInput_Id,
                caDocumentFormInputType_Id : field.caDocumentFormInputType_Id
            };

            if(field.hasOwnProperty('options')){
                if(field.options.length){
                    input.options = field.options
                }
            }

            if(field.file.hasOwnProperty('types')){
                if(field.file.types.length){
                    for(let fieldType in field.file.types){
                        if(field.file.types.hasOwnProperty(fieldType)){
                            let file = field.file.types[fieldType];

                            let fileInfo = {
                                label : file.Description,
                                fileTypeId : file.caCustomerFileType_Id
                            };

                            input.files.push(fileInfo);
                        }
                    }

                    ++docs.step;
                    input.step = docs.step;
                }else{
                    if(docs.step === 0){
                        docs.step = 1;
                    }

                    input.step = docs.step;
                }
            }

            return(
                <DocsFileGenerateInputsType
                    optionInfo={input}
                    state={this.getActualState}
                    optionsSwitch={this.optionsSwitch}
                    switchAction={this.switchFormType}
                    updateState={this.updateActualState}
                />
            )
        }
    },

    /**
     * print table with reasons file rejected
     */
    reasonsFileRejected(reasons){
        return(
            <p>{translate(reasons.TextTranslatiON)}</p>
        )
    },

    /**
     * Return current rejected reasons in current customer form selected
     *
     * @param customerFormId
     * @returns {*}
     */
    getCurrentReasonsRejected(customerFormId){
        let customerForm = UIService.docsFileGetCustomerDocumentForm(customerFormId);

        if(customerForm.hasOwnProperty('values')){
            let values = customerForm.values;
            for(let value in values){
                if(values.hasOwnProperty(value)){
                    if(values[value].hasOwnProperty('files')){
                        let files = values[value].files;
                        for(let file in files){
                            if(files.hasOwnProperty(file)){
                                if(files[file].hasOwnProperty('reasons')){
                                    return values[value].files[file].reasons;
                                }
                            }
                        }
                    }
                }
            }
        }

        return false
    },

    render(){
        let docs = UIService.getDocsFile();
        if(!docs.forms.hasOwnProperty(this.props.option)){
            UIService.docFilesCustomerFormsInformation(this.props.option);
        }

        if(!docs.currentFormInputsCategories.hasOwnProperty(this.props.option)){
            UIService.docFilesFormInputsCategories(this.props.option);
        }

        if(docs.readyPending() && !this.state.sendingFile){
            if(this.state.option != this.props.option){
                this.setState(this.getInitialState())
            }else{
                docs.step = 0;
                let twoOptions = (_.size(docs.forms[this.props.option]) == 2);
                if(UIService.docFilesGetFormSelectedId() === false){
                    this.selectedIdForm()
                }

                if(docs.customerForms[this.props.option] && !this.state.newDocument){
                    return <DocsVerifyIDCustomerForms forms={docs.customerForms} addDocument={this.addDocument}/>
                }

                let form = UIService.docsFileGetCurrentForm();
                if(form){
                    if(form.hasOwnProperty('fields')){
                        return(
                            <div id="docsFilesFormContent">
                                {(() =>{
                                    if(this.state.idOptSelect){
                                        let element = UIService.docsFileGetCurrentFormElement(this.state.idOptSelect);
                                        let src = UIService.docsFileGetSrcImg(element);

                                        return(
                                            <div id="docsFilesShowOptionSelectedContent" onClick={this.optionReset}>
                                                <img
                                                    src={src}
                                                    id="docsFilesShowOptionSelected"
                                                    title={translate(element.Description)}
                                                />
                                                <span>{translate('DOCS_FILE_GO_BACK')}</span>
                                            </div>
                                        )
                                    }
                                })()}

                                {(() =>{
                                    if(!this.state.checkOption){
                                        return(
                                            <div id="docsFileTXT">
                                                {translate('DOCS_FILE_VERIFY_IMPORTANT_TXT')}
                                            </div>
                                        )
                                    }
                                })()}

                                {(() =>{
                                    if(twoOptions){
                                        let key = Object.keys(docs.forms[this.props.option]);
                                        let forms = docs.forms[this.props.option];
                                        this.optionsSwitch[forms[key[0]].caDocumentForm_Id] = false;
                                        this.optionsSwitch[forms[key[1]].caDocumentForm_Id] = true;
                                        let optionOne = docs.forms[this.props.option][key[0]].TagTitle;
                                        let optionTwo = docs.forms[this.props.option][key[1]].TagTitle;

                                        return(
                                            <div className="OptTittle">
                                                <span>{translate(optionOne)}</span>
                                                <span className="switch"/>
                                                <span>{translate(optionTwo)}</span>
                                            </div>
                                        )
                                    }
                                })()}

                                {(() =>{
                                    if(twoOptions){
                                        let checked = this.state.switchForm;

                                        return(
                                            <div id="switchOpt">
                                                <label className="switch">
                                                    <input type="checkbox" onChange={this.switchFormType} checked={checked}/>
                                                    <span className="slider round"/>
                                                </label>
                                            </div>
                                        )
                                    }
                                })()}

                                <div id="docsFileFormContent">
                                    <form id="docsFileForm" onSubmit={this.action}>
                                        {form.fields.map(this.generateForm)}

                                        {(() =>{
                                            if(this.state.idOptSelect && this.state.customerFormId){
                                                let reasons = this.getCurrentReasonsRejected(this.state.customerFormId);
                                                return(
                                                    <div className="docsFileReasonsFileRejected">
                                                        <p>{translate('DOCS_FILE_REJECTED_REASONS_TITLE')}</p>
                                                        {reasons.map(this.reasonsFileRejected)}
                                                    </div>
                                                )
                                            }
                                        })()}

                                        {(() =>{
                                            if(this.state.checkOption){
                                                let docs = UIService.getDocsFile();
                                                let bntTXT = (docs.currentStep < docs.step) ? 'DOCS_FILE_NEXT_STEP' : 'DRAG_DROP_UPLOAD_TXT';
                                                return <div id="docsFileButtonContent"><button type='submit'>{translate(bntTXT)}</button></div>
                                            }
                                        })()}
                                    </form>
                                </div>
                            </div>
                        )
                    }
                }
            }
        }

        return <div className="loader"></div>
    }
});

module.exports.DocsFormRequestContent = DocsFormRequestContent;