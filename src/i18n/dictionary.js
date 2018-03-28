//['version française', 'english version'].
//Dynamic strings can be represented with a function which returns a template
//literal.
export default {
  result: ['résultat', 'result'],
  results: ['résultats', 'results'],
  operation: ['Opération', 'Operation'],
  operations: ['Opérations', 'Operations'],
  operationList: [
    results => `Liste des opérations (${results})`,
    results => `Operations list (${results})`
  ],
  emptyOperationList: [
    'La liste des opérations est vide',
    'Operation list is empty'
  ],
  loadingOperations: [
    'Chargement de la liste des opérations',
    'Operation list is loading']
  ,
  operationNotFound: [
    operation => `L'opération ${operation} est introuvable.`,
    operation => `The operation ${operation} was not found.`
  ],
  fromOperation: [
    'Issu de l\'opération',
    'From operation'
  ],
  family: ['Famille', 'Family'],
  families: ['Familles', 'Families'],
  familyList: [
    results => `Liste des familles (${results})`,
    results => `Family list (${results})`
  ],
  emptyFamilyList: [
    'La liste des familles est vide',
    'Family list is empty'
  ],
  loadingFamilies: [
    'Chargement de la liste des familles',
    'Family list is loading']
  ,
  serie: ['Série', 'Series'],
  series: ['Séries', 'Series'],
  seriesList: [
     results => `Liste des séries (${results})`,
     results => `Series list (${results})`
   ],
  emptySeriesList: [
    'La liste des séries est vide',
    'Series list is empty'
  ],
  fromSerie: [
    'Issu de la série',
    'From series'
  ],
  seriesNotFound: [
    series => `Les séries ${series} sont introuvables.`,
    series => `The series ${series} were not found.`
  ],
  loadingSeries: [
    'Chargement de la liste des séries',
    'Serie list is loading']
  ,
  emptyProductList: [
    'La liste des produits est vide',
    'Product list is empty'
  ],
  product: ['Produit', 'Product'],
  products: ['Produits', 'Products'],
  productList: [
    results => `Liste des indicateurs (${results})`,
    results => `List of indicators (${results})`
  ],
  loadingProducts: [
    'Chargement de la liste des produits',
    'Product list is loading']
  ,
  organization: ['Organisation', 'Organization'],
  organizations: ['Organisations', 'Organizations'],
  organizationList: [
    results => `Liste des organisations (${results})`,
    results => `List of organizations (${results})`
  ],
  emptyOrganizationList: [
    'La liste des organisations est vide',
    'Organization list is empty'
  ],
  loadingOrganizations: [
    'Chargement de la liste des organisations',
    'Organisation list is loading']
  ,
  isolatedOrganization: [
    'Cette organisation ne possède ni mère, ni fille',
    'This organization has no mother or daughters'
  ],
  seriesByFamily: [
    results => `Séries de la famille (${results})`,
    results => `Family series (${results})`
  ],
  seriesByProduct: [
    results => `Séries impliquant l'indicateur (${results})`,
    results => `Series involving indicator (${results})`
  ],
  operationsByFamily: [
    results => `Opérations de la famille (${results})`,
    results => `Family operations (${results})`
  ],
  operationsBySeries: [
    results => `Opérations de la série (${results})`,
    results => `Series operations (${results})`
  ],
  productsBySeries: [
    results => `Indicateurs de la série (${results})`,
    results => `Series indicators (${results})`
  ],
  motherFamily: [
    'Famille mère',
    'Mother family'
  ],
  motherSeries: [
    'Série mère',
    'Mother series'
  ],
  motherOrganization: [
    'mère',
    'mother'
  ],
  daughterOrganization: [
    'fille',
    'daughter'
  ],
  noOrganization: [
    type => `Aucune organisation ${type}`,
    type => `No ${type} organization`,
  ],
  oneOrganization: [
    type => `Organisation ${type}`,
    type => `${type} organization`
  ],
  multipleOrganizations: [
    type => `Organisations ${type}s`,
    type => `${type} organizations`
  ],
  availableFromCASE: [
    'Disponible au CASD',
    'Available from CASD'
  ],
  serieHoldsNoOperation: [
    'Cette série ne contient aucune opération',
    'This serie does not hold any operation'
  ],
  familyHoldsNoOperation: [
    'Cette famille ne contient aucune opération',
    'This family does not hold any operation'
  ],
  familyHoldsNoSerie: [
    'Cette famille ne contient aucune série',
    'This family does not hold any serie'
  ],
  operationHoldsNoProduct: [
    "Aucun produit n'est issu de cette opération",
    'No products are issued from this operation'
  ],
  seriesHoldsNoProduct: [
    "Aucun produit n'est issu de cette série",
    'No products are issued from this series'
  ],
  seeServicePublic: [
    'Voir sur Service-Public.fr',
    'More info on Service-Public.fr'
  ],
  historyNote: [
    'Note historique',
    'History note'
  ],
  validFor: [
    'Valide pour',
    'Valid for'
  ],
  seriesIsReplacedList: [
    results => `Liste des séries remplacées (${results})`,
    results => `Replaced series list (${results})`
  ],
  replacesSeriesList: [
    results => `Série remplacée par (${results})`,
    results => `Series replaced by (${results})`
  ],
  seeAlsoSeriesList: [
    results => `Liste des séries liées (${results})`,
    results => `List of series linked (${results})`
  ],
  indicatorIsReplacedList: [
    results => `Liste des indicateurs remplacés (${results})`,
    results => `Replaced indicator list (${results})`
  ],
  replacesIndicatorList: [
    results => `Indicateur remplacé par (${results})`,
    results => `Indicator replaced by (${results})`
  ],
  seeAlsoIndicatorList: [
    results => `Liste des indicateurs liés (${results})`,
    results => `List of indicators linked (${results})`
  ],
  titleCreator: [
    results => `Propriétaire (${results})`,
    results => `Owner (${results})`
  ],
  titleContributor: [
    results => `Contributeur (${results})`,
    results => `Contributor (${results})`
  ],
}
