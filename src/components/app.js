import React from 'react'
import Menu from './menu'

export default function App({ location, children }) {

  return (
    <div className="container-fluid">
      <Menu location={location} />
      { children }
    </div>
  )
}
