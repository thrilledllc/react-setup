// source: https://github.com/yahoo/react-intl/blob/master/examples/translations/src/server/index.js
import path from 'path';
import { sync as globSync } from 'glob';
import { readFileSync } from 'fs';
import serialize from 'serialize-javascript';

const translations = globSync('./dist/lang/*.json')
    .map((filename) => [
      path.basename(filename, '.json'),
      readFileSync(filename, 'utf8')
    ])
    .map(([locale, file]) => [locale, JSON.parse(file)])
    .reduce((collection, [locale, messages]) => {
      collection[locale] = messages;
      return collection;
    }, {});

export function getLocaleMessages(locale) {
  const messages = translations[locale];
  const data = JSON.stringify({ 'locale': locale, 'messages': messages });
  return data;
}
