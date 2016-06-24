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
 * @param defaultText default text if it does not exist
 *
 * @returns {string}
 */
export function translate(key, defaultText = ''){
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

  return content;
};