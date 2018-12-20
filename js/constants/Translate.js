/**
 * Created by jobando on 03-Jun-16.
 */
import {CashierStore} from '../stores/CashierStore'
import {EN} from './language/EN'
import {ES} from './language/ES'

/**
 * translation label
 *
 * @param key
 * @param defaultText
 * @param tags
 * @returns {*}
 */
export function translate(key, defaultText = '', tags = {}){
	let currentLang = CashierStore.getLanguage();
	let langTags = {};

	switch(currentLang){
		case "ES":
			langTags = ES();
			break;
		default:
			langTags = EN();
	}
	let content = langTags[key];
	content = (content) ? content : defaultText;
	content = (content) ? content : key;

	//replace tags
	Object.keys(tags).map((key) => {
		content = content.replace(new RegExp(`\{${key}\}`, 'g'), tags[key]);
	});

	return content;
}