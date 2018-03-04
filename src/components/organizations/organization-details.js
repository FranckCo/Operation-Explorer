import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect } from 'sparql-connect';
import OrganizationHierarchy from './organization-hierarchy';
import D from 'i18n'

/**
  * Builds the query that retrieves the details on a given organization.
  */
const queryBuilder = organization => `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?seeAlso
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
    <${organization}> skos:prefLabel ?label .
    FILTER (lang(?label) = 'fr')
    OPTIONAL { <${organization}> rdfs:seeAlso ?seeAlso . }
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizationDetails',
  params: ['organization'],
  singleResult: true
});

function OrganizationDetails({ organization, label, seeAlso }) {
  return (
    <div>
      <h1>{label}
        {(seeAlso.length > 0) &&
          <a href={seeAlso}>
            <img className="dila-logo" alt={D.seeServicePublic} data-tip={D.seeServicePublic} src="/img/marianne.png" />
          </a>
        }
      </h1>
      <ReactTooltip />
      <OrganizationHierarchy organization={organization} />
    </div>
  );
}

export default connector(OrganizationDetails);
