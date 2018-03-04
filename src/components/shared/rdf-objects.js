export const findObject = rdf => rdfObjects.find(r => r.rdf === rdf).type;

const rdfObjects = [
	{
		rdf: 'http://rdf.insee.fr/def/base#StatisticalOperationSeries',
		type: 'series',
	},
	{
		rdf: 'http://rdf.insee.fr/def/base#StatisticalIndicator',
		type: 'product',
	},
];
