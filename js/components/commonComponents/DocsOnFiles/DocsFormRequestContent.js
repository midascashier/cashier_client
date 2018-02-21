import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {TransactionService} from '../../../services/TransactionService'
import {DocsFileGenerateInputsType} from './DocsFileGenerateInputsType'
import {DocsVerifyIDCustomerForms} from '../../../components/commonComponents/DocsOnFiles/DocsVerifyIDCustomerForms'

let DocsFormRequestContent = React.createClass({

    propsType : {
        option : React.PropTypes.node
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {
            switchForm : false,
            idOptSelect : null,
            checkOption : false,
            newDocument : false,
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
        let docs = UIService.getDocsFile();
        let elementInformation = {};
        let files = this.state.files;
        let formData = new FormData();

        elementInformation['fileType'] = this.state.valueOption;
        elementInformation['value'] = e.target[0].value;
        formData.append('input[' + '' + ']', JSON.stringify(elementInformation));

        for(let key in files){
            if(files.hasOwnProperty(key)){
                formData.append('23[]', files[key]);
            }
        }

        formData.append('documentFormCustomerId', '');
        formData.append('countExtraFiles', files.length);
        formData.append('actionType', this.element.action);
        formData.append('documentFormId', this.element.formId);

        TransactionService.docsFileSave(formData);
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
    addDocument(){
        let actualState = this.state;
        actualState.newDocument = true;
        this.setState(actualState);
    },

    /**
     * Change type ID form
     *
     * @param e
     */
    switchFormType(e){
        this.selectedIdForm();

        let actualState = this.getInitialState();
        actualState.newDocument = true;
        actualState.switchForm = e.target.checked;
        this.setState(actualState);
    },

    /**
     * Get current form to option selected
     *
     * @returns {*}
     */
    getCurrentForm(){
        let docs = UIService.getDocsFile();
        if(docs.forms.hasOwnProperty(this.props.option)){
            let forms = docs.forms[this.props.option];
            for(let current in forms){
                if(forms.hasOwnProperty(current)){
                    if(forms[current].caDocumentForm_Id == docs.formSelectedId){
                        return forms[current]
                    }
                }
            }
        }

        return false
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
                label : field.Label,
                Required : field.Required,
                caDocumentFormInput_Id : field.caDocumentFormInput_Id,
                caDocumentFormInputType_Id : field.caDocumentFormInputType_Id
            };

            if(field.file.hasOwnProperty('types')){
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
            }

            if(field.hasOwnProperty('options')){
                if(field.options.length){
                    input.options = field.options
                }
            }

            return <DocsFileGenerateInputsType optionInfo={input} state={this.getActualState} updateState={this.updateActualState}/>
        }
    },

    render(){
        let docs = UIService.getDocsFile();
        if(!docs.forms.hasOwnProperty(this.props.option)){
            UIService.docFilesCustomerFormsInformation(this.props.option);
        }

        if(!docs.currentFormInputsCategories.hasOwnProperty(this.props.option)){
            UIService.docFilesFormInputsCategories(this.props.option);
        }

        if(docs.readyPending()){
            if(this.state.option != this.props.option){
                this.setState(this.getInitialState())
            }else{
                let twoOptions = (_.size(docs.forms[this.props.option]) == 2);
                if(UIService.docFilesGetFormSelectedId() === false){
                    this.selectedIdForm()
                }

                if(docs.customerForms[this.props.option] && !this.state.newDocument){
                    return <DocsVerifyIDCustomerForms forms={docs.customerForms} addDocument={this.addDocument}/>
                }

                let form = this.getCurrentForm();
                if(form){
                    if(form.hasOwnProperty('fields')){
                        return(
                            <div id="docsFilesFormContent">
                                {(() =>{
                                    if(this.state.checkOption){
                                        let element = document.getElementById(this.state.idOptSelect);
                                        let src = element.getAttribute('src');
                                        return(
                                            <div id="docsFilesShowOptionSelectedContent" onClick={this.optionReset}>
                                                <img
                                                    src={src}
                                                    id="docsFilesShowOptionSelected"
                                                    title={translate('DOCS_FILE_VERITY_CHANGE_OPTIONS')}
                                                />
                                                <span>{translate('DOCS_FILE_GO_BACK')}</span>
                                            </div>
                                        )
                                    }
                                })()}

                                <div id="docsFileTXT">
                                    {translate('DOCS_FILE_VERIFY_IMPORTANT_TXT')}
                                </div>

                                {(() =>{
                                    if(twoOptions){
                                        return(
                                            <div className="OptTittle">
                                                <span>{translate('MY_REQUEST_DOCS_OPTION_ID_TXT')}</span>
                                                <span className="switch"/>
                                                <span>{translate('MY_REQUEST_DOCS_OPTION_VE_EW_TXT')}</span>
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

                                <div id="docsFilesOptionContent">
                                    <form id="docsFileFormContent" onSubmit={this.action}>
                                        {form.fields.map(this.generateForm)}

                                        {(() =>{
                                            if(this.state.checkOption){
                                                return <div id="docsFileButtonContent"><button type='submit'>{translate('DRAG_DROP_UPLOAD_TXT')}</button></div>
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