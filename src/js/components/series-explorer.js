import React from 'react'
import { sparqlConnect, setPrefixes } from 'sparql-connect'
import SeriesList from './series-list'

setPrefixes({}) // Doesn't seem to work
/**
 * Builds the query that retrieves the list of families.
 */
const queryBuilder = () => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?series ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    ?series a insee:StatisticalOperationSeries ; skos:prefLabel ?label .
  }
  ORDER BY ?series
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'series'
})

function SeriesExplorer({ series }) {
  return(
    <div>
      <SeriesList series={series}/>
    </div>
  )
}

export default connector(SeriesExplorer, {
  loading: () => <span>Loading series list</span>
})
