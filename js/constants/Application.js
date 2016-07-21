/**
 * Created by jobando on 03-Jun-16.
 */
import { CashierStore } from '../stores/CashierStore'

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isIP(value){
	let regExpIP = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
	let matched = regExpIP.test(value);
	return matched;
};

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isEmail(value){
	let regExpEmail = new RegExp(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);
	let matched = regExpEmail.test(value);
	return matched;
};

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isNumber(value){
	let regExpInt = new RegExp(/^[0-9]+$/);
	let regExpFloat = new RegExp(/[0-9]+[,\.][0-9]+/);
	let matched = (regExpInt.test(value) || regExpFloat.test(value));
	return matched;
};

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isControlNumber(value){

	let processor = CashierStore.getProcessor();
	let processorName = processor.Name;
	let regularExp = '';

	if(processorName == 'MoneyGram'){
		regularExp = /^[0-9]{8}$/;
	}else if(processorName == 'WesternUnion'){
		regularExp = /^[0-9]{10}$/;
	}else if(processorName == 'Ria'){
		regularExp = /^[0-9]{11}$/;
	}

	let regExp = new RegExp(regularExp);
	return regExp.test(value);
};

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isCreditNumber(value){
	let regExpVI = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);
	let regExpMC = new RegExp(/^5[1-5][0-9]{14}$/);
	let matched = (regExpVI.test(value) || regExpMC.test(value));
	return matched;
};

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isCVV(value){
	let regExpCVV = new RegExp(/^[0-9]{3}$/i);
	let matched = regExpCVV.test(value);
	return matched;
};

/**
 *
 * @param value
 * @returns {boolean}
 */
export function isBitCoinAddress(value){
	let regExpBTC = new RegExp(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/i);
	let matched = regExpBTC.test(value);
	return matched;
};