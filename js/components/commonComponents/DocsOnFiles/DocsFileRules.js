import {UIService} from '../../../services/UIService'
import {ConnectorServices} from '../../../services/ConnectorServices'

/**
 * Rules are validated with storage values ​​_DocsFile
 *
 * @type {{1: {name: string, rules: boolean}, 2: {name: string, rules: boolean}, 3: {name: string, rules: boolean}, 4: {name: string, rules: {pendingAdditionalInfo: boolean}}, 5: {name: string, rules: {pendingRecovery: boolean}}, print: (function(*=, *): *)}}
 */
let DocsFileRules = {
	pendingInfo: false,

	1: {
		name: 'kyc',
		rules: true
	},

	2: {
		name: 'updateAccountInfo',
		rules: false
	},

	3: {
		name: 'ccIssues',
		rules: {
			forms: {
				ccIssues: {
					length: true
				}
			}
		}
	},

	4: {
		name: 'verificationRequired',
		rules: {
			pendingAdditionalInfo: true
		}
	},

	5: {
		name: 'recovery',
		rules: {
			pendingRecovery: true
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
			this.pendingInfo = true;

			let params = {
				languageId: 11,
				categoryId: categoryId,
				f: 'docFilesCustomerFormsInformation',
				companyId: UIService.getCompanyInformation().companyId,
				customerId: UIService.getCustomerInformation().customerId
			};

			ConnectorServices.makeCashierRequestAsync(params).then(data => {
				this.pendingInfo = false;
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
		let name = null;
		let resolve = true;
		try{
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
												name = this[categoryId].name;
												if(!docs[rule].hasOwnProperty(name)){
													if(name){
														if(!this.pendingInfo){
															this.checkFormInformation(categoryId).then($response => {
																let forms = {};
																forms[name] = $response.forms;
																resolve = this.checkObjectRule(rules[rule], forms);

																if(!resolve){
																	let bar = document.getElementById('requestsOptions');
																	let tab = document.getElementById(name);
																	if(tab instanceof HTMLElement){
																		if(bar.contains(tab)){
																			bar.removeChild(tab);
																		}
																	}
																}
															})
														}
													}
												}
												break;

											default:
												resolve = this.checkObjectRule(rules[rule], docs[rule]);
												break;
										}
									}
								}else{
									resolve = (rules[rule] == docs[rule]);
								}
							}
						}
					}
				}else{
					resolve = rules;
				}
			}
		}catch(error){
			resolve = false
		}

		return resolve
	},

	/**
	 * Check if the tab is printed
	 *
	 * @param categoryId
	 * @param docFile
	 * @returns {*}
	 */
	checkRules(categoryId, docFile){
		if(this.hasOwnProperty(categoryId)){
			return this.print(categoryId, docFile)
		}

		return false
	}
};

module.exports.DocsFileRules = DocsFileRules;