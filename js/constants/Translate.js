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
	var currentLang = CashierStore.getLanguage();
	switch(currentLang){
		case "ES":
			var langTags = ES();
			break;
		default:
			var langTags = EN();
	}
	var content = langTags[key];
	content = (content) ? content : defaultText;
	content = (content) ? content : key;

	//replace tags
	Object.keys(tags).map(function(key){
		content = content.replace('{' + key + '}', tags[key]);
	});

	return content;
};
