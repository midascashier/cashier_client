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
     * Execute actions when component will mount
     */
    componentWillMount(){
        UIService.docFilesCategories();
        UIService.docFilesCustomerPendingForms();
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        let docFile = UIService.getDocsFile();
        this.buildCategoriesList(docFile.categoriesList);

        return {
            option : this.currentTabSelected()
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
     * Check and set current tab selected
     */
    currentTabSelected(){
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

        return initialTab
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
                    let tab = {
                        Name : '',
                        caDocumentCategory_Id : ''
                    };

                    tab.Name = ApplicationService.toCamelCase(categoriesList[category].Name);
                    tab.caDocumentCategory_Id = categoriesList[category].caDocumentCategory_Id;

                    let found = false;
                    for(let option in this.elements.options){
                        if(this.elements.options.hasOwnProperty(option)){
                            if(tab.Name == this.elements.options[option].Name){
                                found = true;
                                break
                            }
                        }
                    }

                    if(!found){
                        this.elements.options.push(tab);
                    }
                }
            }

            if(!this.currentTabSelected()){
                let actualState = this.state;
                actualState.option  = this.elements.options[0].Name;
                this.setState(actualState);
            }
        }
    },

    /**
     * Check if the tab is printed
     *
     * @param categoryId
     * @returns {*}
     */
    checkRules(categoryId){
        if(DocsFileRules.hasOwnProperty(categoryId)){
            let docFile = UIService.getDocsFile();
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
    buildTab(option){
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
        UIService.setDocsCurrentOption(id);
        actualState.responseUpload = UIService.getDocsUploadResponse();
        this.setState(actualState);
    },

    render(){
        return(
            <div id="requestContent">
                <div id="requestsOptions">
                    {this.elements.options.map(this.buildTab)}

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