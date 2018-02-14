import React from 'react'
import {Link} from 'react-router'
import {UIService} from '../services/UIService'
import {translate} from '../constants/Translate'
import {CashierStore} from '../stores/CashierStore'
import {ApplicationService} from '../services/ApplicationService'
import {DocsFileRules} from './commonComponents/DocsOnFiles/DocsFileRules'
import {DocsFormRequestContent} from './commonComponents/DocsOnFiles/DocsFormRequestContent'

let RequestsContent = React.createClass({

    elements : {
        options : [],

        style : {
            optClickTab : '#D5232F',
            optInitialTab : '#A51419'
        },

        //Class elements in use
        DOCS_OPTIONS : 'DocsOptions',
        DOCS_OPTIONS_INITIAL : 'DocsOptions DocsOptionsClick'
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        let docFile = UIService.getDocsFile();
        this.buildCategoriesList(docFile.categoriesList);

        let initialTab;
        if(this.state){
            if(this.state.hasOwnProperty('option')){
                if(this.state.option){
                    initialTab = this.state.option
                }
            }
        }else{
            initialTab = (this.elements.options[0]);
            initialTab = (initialTab) ? this.elements.options[0].Name : false;
        }

        if(initialTab){
            UIService.setDocsCurrentOption(initialTab);
        }

        return {
            option : initialTab
        }
    },

    /**
     * this is the callback function the store calls when a state change
     *
     * @private
     */
    _onChange(){
        this.setState(this.getInitialState());
    },

    /**
     * Execute actions when component will mount
     */
    componentWillMount(){
        UIService.docFilesCategories();
        UIService.docFilesCustomerPendingForms();
    },

    /**
     * Build categories request
     *
     * @param categoriesList
     */
    buildCategoriesList(categoriesList){
        if(_.size(categoriesList)){
            for(let category in categoriesList){
                if(categoriesList.hasOwnProperty(category)){
                    let tap = {
                        Name : '',
                        caDocumentCategory_Id : ''
                    };

                    tap.Name = ApplicationService.toCamelCase(categoriesList[category].Name);
                    tap.caDocumentCategory_Id = categoriesList[category].caDocumentCategory_Id;

                    let found = false;
                    for(let option in this.elements.options){
                        if(this.elements.options.hasOwnProperty(option)){
                            if(tap.Name == this.elements.options[option].Name){
                                found = true;
                                break
                            }
                        }
                    }

                    if(!found){
                        this.elements.options.push(tap);
                    }
                }
            }

            let actualState = this.state;
            actualState.option  = this.elements.options[0].Name;
            this.setState(actualState);
        }
    },

    /**
     * Check if the tab is printed
     *
     * @param categoryId
     * @returns {*}
     */
    checkRules(categoryId){
        let docFile = UIService.getDocsFile();

        if(DocsFileRules.hasOwnProperty(categoryId)){
            return DocsFileRules.print(categoryId, docFile)
        }

        return false
    },

    /**
     * Build tab text
     *
     * @param option
     * @returns {XML}
     */
    buildTap(option){
        if(this.state.option){
            if(this.checkRules(option.caDocumentCategory_Id)){
                let tabTXT = translate(option.Name);
                let className = (this.state.option == option.Name) ? this.elements.DOCS_OPTIONS_INITIAL : this.elements.DOCS_OPTIONS;

                return(
                    <div id={option.Name} className={className} onClick={this.docsOptionsActions}>
                        {tabTXT}
                    </div>
                )
            }
        }
    },

    /**
     * Build and set current elements forms
     *
     * @returns {{}}
     */
    customerFormsInformation(options){
        if(_.size(options)){
            let formOptions = {};
            for(let option in options){
                if(options.hasOwnProperty(option)){
                    let form = {};
                    let currentOpt = options[option];
                    let category = translate(currentOpt.TagTitle);

                    form[category] = {};
                    form[category]['elements'] = {};
                    form[category]['DocumentForm_Id'] = {};
                    form[category]['DocumentForm_Id'] = currentOpt.caDocumentForm_Id;

                    for(let element in currentOpt.fields){
                        if(currentOpt.fields.hasOwnProperty(element)){
                            form[category]['elements'][element] = currentOpt.fields[element];

                            if(currentOpt.fields[element].file.hasOwnProperty('types')){
                                form[category]['elements'][element].file = currentOpt.fields[element].file.types;
                            }
                        }
                    }

                    formOptions[ApplicationService.toCamelCase(category)] = form[category];   
                }
            }

            return formOptions;
        }

        return false;
    },

    /**
     * Execute action on click tab option
     * 
     * @param event
     */
    docsOptionsActions(event){
        UIService.docsResetResponseUpload();

        let optionElements = document.getElementsByClassName(this.elements.DOCS_OPTIONS);
        let count = optionElements.length;

        for(let i=0; i<count; i++){
            optionElements[i].setAttribute('class', 'DocsOptions');
        }

        let id = event.target.getAttribute('id');
        let element  = document.getElementById(id);
        element.setAttribute('class', 'DocsOptions DocsOptionsClick');

        let actualState = this.state;
        actualState.option = id;
        actualState.responseUpload = UIService.getDocsUploadResponse();
        this.setState(actualState);
    },

    render(){
        return(
            <div id="requestContent">
                <div id="requestsOptions">
                    {this.elements.options.map(this.buildTap)}

                    <div id="DocsFileBack">
                        <Link to={`/deposit/`}>
                            <span>{translate('DOCS_FILE_GO_HOME')}</span>
                        </Link>
                    </div>
                </div>
                <div id="requestOptionContent">
                    <DocsFormRequestContent option={this.state.option}/>
                </div>
            </div>
        )
    },

    /**
     * React function to add listener to this component once is mounted
     * here the component listen changes from the store
     */
    componentDidMount(){
        CashierStore.addChangeListener(this._onChange);
    },

    /**
     * React function to remove listener to this component once is unmounted
     */
    componentWillUnmount(){
        CashierStore.removeChangeListener(this._onChange);
    }
});

module.exports.RequestsContent = RequestsContent;