/**
 * Rules are validated with storage values ​​_DocsFile
 *
 * @type {{1: {name: string, rules: boolean}, 2: {name: string, rules: boolean}, 3: {name: string, rules: boolean}, 4: {name: string, rules: {pendingAdditionalInfo: boolean}}, 5: {name: string, rules: {pendingRecovery: boolean}}, print: (function(*=, *): *)}}
 */
let DocsFileRules = {
    1 : {
        name : 'kyc',
        rules : {
            kycIDApproved : false,
            forms : {
                kyc : 2
            }
        }
    },

    2 : {
        name : 'updateAccountInfo',
        rules : true
    },

    3 : {
        name : 'ccIssues',
        rules : true
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
     * Check the schema rules and validate
     *
     * @param categoryId
     * @param docs
     * @returns {*}
     */
    print(categoryId, docs){
        if(this.hasOwnProperty(categoryId)){
            let result = (this[categoryId].rules);
            for(let rule in this[categoryId].rules){
                if(result){
                    if(this[categoryId].rules.hasOwnProperty(rule)){
                        if(docs.hasOwnProperty(rule)){
                            if(typeof docs[rule] === "object" || Array.isArray(docs[rule])){
                                result = true
                            }else{
                                result = (this[categoryId].rules[rule] === docs[rule])
                            }
                        }else{
                            result = false
                        }
                    }
                }else{
                    return false
                }
            }

            return result
        }

        return false
    }
};

module.exports.DocsFileRules = DocsFileRules;