import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {DocsFileGenerateInputsType} from './DocsFileGenerateInputsType'

let DocsFormRequestContent = React.createClass({

    propsType : {
        option : React.PropTypes.node
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {
            checkOption: false
        }
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
    verifyIdOptionsReset(){
        this.setState(this.getInitialState());
    },

    /**
     * Change type ID option
     *
     * @param e
     */
    switchVerifyType(e){
        this.selectedIdForm();

        let actualState = this.state;
        actualState.checkOption = e.target.checked;
        this.setState(actualState);
    },

    /**
     * Generate Form options
     *
     * @param currentForm
     * @returns {XML}
     */
    generateForm(currentForm){
        let inputs = [];
        let docs = UIService.getDocsFile();
        let form = docs.forms[this.props.option][currentForm];
        let twoOptions = (_.size(docs.forms[this.props.option]) == 2);

        for(let option in form.fields){
            if(form.fields.hasOwnProperty(option)){
                let input = {
                    files: [],
                    options: [],
                    label : form.fields[option].Label,
                    Required : form.fields[option].Required,
                    caDocumentFormInput_Id : form.fields[option].caDocumentFormInput_Id,
                    caDocumentFormInputType_Id : form.fields[option].caDocumentFormInputType_Id
                };

                if(form.fields[option].file.hasOwnProperty('types')){
                    for(let field in form.fields[option].file.types){
                        if(form.fields[option].file.types.hasOwnProperty(field)){
                            let file = form.fields[option].file.types[field];

                            let fileInfo = {
                                label : file.Description,
                                fileTypeId : file.caCustomerFileType_Id
                            };

                            input.files.push(fileInfo);
                        }
                    }
                }

                if(form.fields[option].hasOwnProperty('options')){
                    if(form.fields[option].options.length){
                        input.options = form.fields[option].options
                    }
                }

                inputs.push(input)
            }
        }

        return <DocsFileGenerateInputsType optionInfo={inputs} twoOptions={twoOptions}/>
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
            let twoOptions = (_.size(docs.forms[this.props.option]) == 2);
            if(UIService.docFilesGetFormSelectedId() === false){
                this.selectedIdForm()
            }

            return(
                <div id="docsFilesFormContent">
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
                            return(
                                <div id="switchOpt">
                                    <label className="switch">
                                        <input type="checkbox" onChange={this.switchVerifyType}/>
                                        <span className="slider round"/>
                                    </label>
                                </div>
                            )
                        }
                    })()}

                    {Object.keys(docs.forms[this.props.option]).map(this.generateForm)}
                </div>
            )
        }

        return <div className="loader"></div>
    }
});

module.exports.DocsFormRequestContent = DocsFormRequestContent;