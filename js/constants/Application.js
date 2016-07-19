/**
 * Created by jobando on 03-Jun-16.
 */

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
	let regExpMG = new RegExp(/^[0-9]{8}$/);
	let regExpWU = new RegExp(/^[0-9]{10}$/);
	let regExpRIA = new RegExp(/^[0-9]{11}$/);
	let matched = (regExpMG.test(value) || regExpWU.test(value) || regExpRIA.test(value));
	return matched;
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