import {ConnectorServices} from '../../../services/ConnectorServices'

/**
 * Rules are validated with storage values ​​_DocsFile
 *
 * @type {{1: {name: string, rules: boolean}, 2: {name: string, rules: boolean}, 3: {name: string, rules: boolean}, 4: {name: string, rules: {pendingAdditionalInfo: boolean}}, 5: {name: string, rules: {pendingRecovery: boolean}}, print: (function(*=, *): *)}}
 */
let DocsFileRules = {
    1 : {
        name : 'kyc',
        rules : true
    },

    2 : {
        name : 'updateAccountInfo',
        rules : false
    },

    3 : {
        name : 'ccIssues',
        rules : {
            forms : {
                ccIssues : {
                    length : true
                }
            }
        }
    },

    4 : {
        name : 'verificationRequired',
        rules : {
            pendingAdditionalInfo : true
        }
    },

    5 : {
        name : 'recovery',
        rules : {
            pendingRecovery : true
        }
    },

    /**
     * Check if information is required
     *
     * @param categoryId
     * @returns {*}
     */
    checkFormInformation(categoryId){
        return new Promise(((response) => {
            let params = {
                languageId: 11,
                categoryId: categoryId,
                f: 'docFilesCustomerFormsInformation',
                companyId: 50,
                customerId: 137
            };

            ConnectorServices.makeCashierRequestAsync(params).then(data => {
                if(data && data.hasOwnProperty('response') && data.response.hasOwnProperty('result')){
                    response(data.response.result);
                }else{
                    throw new Error('unable to process your request');
                }
            });
        }));
    },

    /**
     * Check object rule recursively
     * 
     * @param ruleObject
     * @param doc
     * @returns {*}
     */
    checkObjectRule(ruleObject, doc){
        let ruleKeys = Object.keys(ruleObject);

        for(let key in ruleKeys){
            if(ruleKeys.hasOwnProperty(key)){
                if(doc.hasOwnProperty(ruleKeys[key])){
                    if(typeof ruleObject[ruleKeys[key]] == 'object'){
                        return this.checkObjectRule(ruleObject[ruleKeys[key]], doc[ruleKeys[key]]);
                    }

                    return (ruleObject[ruleKeys[key]] == doc[ruleKeys[key]])
                }

                return true
            }
        }

        return false
    },

    /**
     * Check the schema rules and validate
     *
     * @param categoryId
     * @param docs
     * @returns {*}
     */
    print(categoryId, docs){
        return new Promise(((resolve) => {
            if(this.hasOwnProperty(categoryId)){
                let rules = this[categoryId].rules;
                if(typeof rules == 'object'){
                    for(let rule in rules){
                        if(rules.hasOwnProperty(rule)){
                            if(docs.hasOwnProperty(rule)){
                                if(typeof rules[rule] === "object"){
                                    if(_.size(docs[rule])){
                                        switch(rule){
                                            case 'forms':
                                                let name = this[categoryId].name;
                                                if(!docs[rule].hasOwnProperty(name)){
                                                    return new Promise(((result) => {
                                                        this.checkFormInformation(categoryId).then($response => {
                                                            let forms = {};
                                                            forms[name] = $response.forms;
                                                            resolve(this.checkObjectRule(rules[rule], forms))
                                                        })
                                                    }))
                                                }
                                            break;

                                            default:
                                                resolve = this.checkObjectRule(rules[rule], docs[rule]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    resolve(rules);
                }
            }
        }));
    },

    /**
     * Check if the tab is printed
     *
     * @param categoryId
     * @param docFile
     * @returns {*}
     */
    checkRules(categoryId, docFile){
        this.print(categoryId, docFile).then(data => {
            return data
        }).catch(error => {
            return false
        })
    }
};

module.exports.DocsFileRules = DocsFileRules;