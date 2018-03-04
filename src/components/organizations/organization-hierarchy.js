import React from 'react';
import { Link } from 'react-router-dom';
import { sparqlConnect } from 'sparql-connect';
import { organizationLink } from './routes';
import { capitalizeFirstLetter } from 'utils/string-utils'
import D from 'i18n'

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
  if (organizationHierarchy.length === 0) {
    return <span>{D.isolatedOrganization}</span>
  }
  let mothers = organizationHierarchy.filter((org) => (org.mother.length > 0));
  let daughters = organizationHierarchy.filter((org) => (org.daughter.length > 0));
  return (
    <div>
      <div className="rubric-title">{getTitle(mothers, D.motherOrganization)}</div>
      <ul>
        {mothers.map(({ mother, name, type }) => (
          <li key={mother}>
            <Link to={organizationLink(mother)}>{name}</Link>
            <span>{((type === 'F') ? ' (lien fonctionnel)' : '')}</span>
          </li>
        ))}
      </ul>
      <div className="rubric-title">{getTitle(daughters, D.daughterOrganization)}</div>
      <ul>
        {daughters.map(({ daughter, name, type }) => (
          <li key={daughter}>
            <Link to={organizationLink(daughter)}>{name}</Link>
            <span>{((type === 'F') ? ' (lien fonctionnel)' : '')}</span>
          </li>
        ))}
      </ul>
      {/*TODO Add the series produced by the producer*/}
    </div>
  );
}

/**
* Utility function: gets the correct title depending on the type and number of organizations
*/
function getTitle(orgs, type) {
  let title;
  if (orgs.length === 0) title = D.noOrganization(type);
  else if (orgs.length === 1) title = D.oneOrganization(type);
  else title = D.multipleOrganizations(type);
  return capitalizeFirstLetter(title);
}

export default connector(OrganizationHierarchy);
