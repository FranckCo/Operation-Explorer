import React from 'react';
import { Link } from 'react-router';
import { sparqlConnect } from 'sparql-connect';
import { organizationLink } from './routes';

/**
  * Builds the query that retrieves the hierarchy of a given organization.
  */
const queryBuilder = organization => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX org: <http://www.w3.org/ns/org#>
  SELECT ?mother ?daughter ?type ?name
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
	  { ?mother org:hasUnit <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("H" AS ?type)}
	  UNION { ?mother org:linkedTo <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("F" AS ?type)}
	  UNION { ?daughter org:unitOf <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("H" AS ?type)}
	  UNION { ?daughter org:reportsTo <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("F" AS ?type)}
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizationHierarchy',
  params: ['organization'],
  singleResult: false
});

function OrganizationHierarchy({ organizationHierarchy }) {
  console.log(organizationHierarchy);
  if (organizationHierarchy.length === 0) {
    return <span>Cette organisation ne possède ni mère, ni fille</span>
  }
  var mothers = organizationHierarchy.filter((org) => (org.mother.length > 0));
  var daughters = organizationHierarchy.filter((org) => (org.daughter.length > 0));
  console.log(mothers);
  return (
    <div>
      <h2>{getTitle(mothers, 'mère')}</h2>
      <ul>
        {mothers.map(({ mother, name, type }) => (
          <li key={mother}>
            <Link to={organizationLink(mother)}>{name}</Link>
            <span>{((type === 'F') ? ' (lien fonctionnel)' : '')}</span>
          </li>
        ))}
      </ul>
      <h2>{getTitle(daughters, 'fille')}</h2>
      <ul>
        {daughters.map(({ daughter, name, type }) => (
          <li key={daughter}>
            <Link to={organizationLink(daughter)}>{name}</Link>
            <span>{((type === 'F') ? ' (lien fonctionnel)' : '')}</span>
          </li>
        ))}
      </ul>
      // TODO Add the series produced by the producer
    </div>
  );
}

/**
* Utility function: gets the correct title depending on the type and number of organizations
*/
function getTitle(orgs, type) {
  if (orgs.length === 0) return ('Aucune organisation ' + type);
  if (orgs.length === 1) return ('Organisation ' + type);
  return ('Organisations ' + type + 's');
}

export default connector(OrganizationHierarchy);
