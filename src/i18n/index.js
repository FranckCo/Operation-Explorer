import dictionary from './dictionary'

const localDictionary = {}

const langs = ['fr', 'en']

const createLocale = lang => {
  const posLang = langs.indexOf(lang)
  Object.keys(dictionary).forEach(word => {
    localDictionary[word] = dictionary[word][posLang]
  })
}

export const switchLang = () => {
  const lang = getLang() === 'en' ? 'fr' : 'en'
  localStorage.setItem('lang', lang)
  //no effect for now since the page is supposed to be reloaded
  createLocale(lang)
}

export const getLang = () => {
  const lang = localStorage.getItem('lang') || 'en';
  createLocale(lang)
  return lang
}

export default localDictionary;