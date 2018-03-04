import React from 'react';
import SeriesList from '../operations/series-list';
import ProductList from '../products/product-list';
import * as L from './type-of-link';
import { findObject } from './rdf-objects';
import D from 'i18n';

export default ({ resources }) => {
	const cleanRes = buildResources(resources);
	const isReplacedList = filterByTypeOfLink(cleanRes, L.IS_REPLACED);
	const replacesList = filterByTypeOfLink(cleanRes, L.REPLACES);
	const seeAlsoList = filterByTypeOfLink(cleanRes, L.SEE_ALSO);
  console.log(seeAlsoList)
	return (
		<span>
			{filterByTypeOfObject(isReplacedList, 'series').length > 0 && (
				<SeriesList
					series={filterByTypeOfObject(isReplacedList, 'series')}
					title={D.seriesIsReplacedList}
				/>
			)}
			{filterByTypeOfObject(isReplacedList, 'product').length > 0 && (
				<ProductList
					products={filterByTypeOfObject(isReplacedList, 'product')}
					title={D.indicatorIsReplacedList}
				/>
			)}
			{filterByTypeOfObject(replacesList, 'series').length > 0 && (
				<SeriesList
					series={filterByTypeOfObject(replacesList, 'series')}
					title={D.replacesSeriesList}
				/>
			)}
			{filterByTypeOfObject(replacesList, 'product').length > 0 && (
				<ProductList
					products={filterByTypeOfObject(replacesList, 'product')}
					title={D.replacesIndicatorList}
				/>
			)}
			{filterByTypeOfObject(seeAlsoList, 'series').length > 0 && (
				<SeriesList
					series={filterByTypeOfObject(seeAlsoList, 'series')}
					title={D.seeAlsoSeriesList}
				/>
			)}
			{filterByTypeOfObject(seeAlsoList, 'product').length > 0 && (
				<ProductList
					products={filterByTypeOfObject(seeAlsoList, 'product')}
					title={D.seeAlsoIndicatorList}
				/>
			)}
		</span>
	);
};

const filterByTypeOfLink = (resource, typeOfLink) =>
	resource.filter(r => r.typeOfLink === typeOfLink);

const filterByTypeOfObject = (array, type) => array.filter(a => a[type]);

const buildResources = resources =>
	resources.map(r => {
		const type = findObject(r.type);
		return { ...r, [type]: r.outResource };
	});
