//Stardog HTTP API documentation: http://docs.stardog.apiary.io/#
import fetch from 'isomorphic-fetch'

const bodyFromSparql = query => `query=${encodeURIComponent(query)}`

export default (queryURL, authorization) => query =>
  fetch(queryURL, {
    method: 'POST',
    headers: {
      'Authorization': authorization,
      'Accept': 'application/sparql-results+json',
      // We need to pass some `x-www-form-urlencoded` data. `multipart/form-data`
      // created with `new FormData()` does not work.
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyFromSparql(query)
  })
  .then(res => res.json())

