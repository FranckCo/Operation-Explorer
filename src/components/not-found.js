import React from 'react'

export default function NotFound({ message }) {
  const defaultMessage = 'We are sorry but the page you are looking for does ' +
    'not exist.'
  return (
    <div>
      <h3>404 page not found</h3>
      <p>{message || defaultMessage}</p>
    </div>
  )
}
