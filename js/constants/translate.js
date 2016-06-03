/**
 * Created by jobando on 03-Jun-16.
 */
import {CashierStore} from '../stores/cashierStore'
import {EN} from './language/EN'
import {ES} from './language/ES'

/**
 * translation label
 *
 * @param key
 * @param defaultText default text if it does not exist
 * @param values to replace elements in the text
 *
 * @returns {string}
 */
export function translate(key, defaultText = '', values = []) {
  var currentLang = CashierStore.getLanguage();
  switch (currentLang) {
    case "ES":
      var langTags = ES();
      break;
    default:
      var langTags = EN();
  }
  var text = langTags[key];
  return (text) ? text : defaultText;
};