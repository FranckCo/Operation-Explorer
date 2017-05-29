import React from 'react'
import { sparqlConnect } from 'sparql-connect'

const connector = sparqlConnect('SELECT ?s { ?s ?p ?o} LIMIT 1', {
  queryName: 'aQueryWithNoName'
})

function Operations() {

  return (
    <h1>Statistical operations</h1>
  )
}

export default connector(Operations)