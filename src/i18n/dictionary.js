//['version française', 'english version'].
//Dynamic strings can be represented with a function which returns a template
//literal.
export default {
  operation: ['Opération', 'Operation'],
  operations: ['Opérations', 'Operations'],
  emptyOperationList: [
    'La liste des opérations est vide.',
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
  emptyFamilyList: [
    'La liste des familles est vide.',
    'Family list is empty.'
  ],
  serie: ['Série', 'Serie'],
  series: ['Séries', 'Series'],
  fromSerie: [
    'Issu de la série',
    'From serie'
  ],
  seriesNotFound: [
    series => `Les séries ${series} sont introuvables.`,
    series => `The series ${series} were not found.`
  ],
  loadingSeries: [
    'Chargement de la liste des séries.',
    'Serie list is loading.']
  ,
  emptyProductList: [
    'La liste des produits est vide.',
    'Product list is empty.'
  ],
  product: ['Produit', 'Product'],
  products: ['Produits', 'Products'],
  organization: ['Organisation', 'Organization'],
  organizations: ['Organisations', 'Organizations'],
  emptyOrganizationList: [
    'La liste des organisations est vide.',
    'Organization list is empty.'
  ],
  availableFromCASE: [
    'Disponible au CASD',
    'Available from CASD'
  ],
  serieHoldsNoOperation: [
    'Cette série ne contient aucune opération.',
    'This serie does not hold any operation.'
  ],
  familyHoldsNoOperation: [
    'Cette famille ne contient aucune opération.',
    'This family does not hold any operation.'
  ],
  familyHoldsNoSerie: [
    'Cette famille ne contient aucune série.',
    'This family does not hold any serie.'
  ],
  seeServicePublic: [
    'Voir sur Service-Public.fr',
    'More info on Service-Public.fr'
  ]
}