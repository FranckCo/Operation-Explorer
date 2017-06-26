import React from 'react'
import { switchLang } from 'i18n'

export default function LangPicker({ location, lang }) {
  /* HACK for bootstrap css rule .navbar-nav>li>a : we wrap non link elements
  within a `a` tag with no `href` */
  const fr = lang === 'fr' ?
    'fr' :
    <a href={location.pathname} onClick={switchLang}>
      fr
    </a>
  const en = lang === 'en' ?
    'en' :
    <a href={location.pathname} onClick={switchLang}>
      en
    </a>

  return (
    <span className="navbar-text">
      {fr} / {en}
    </span>
  )
}