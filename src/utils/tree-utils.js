import { getTreeFromFlatData } from 'react-sortable-tree';

export const getDataTree = data =>
	getTreeFromFlatData({
		flatData: data.map(n => ({
			id: n.mas,
			label: n.masLabel,
			parent: n.parent || null,
			range: n.range,
			presentational: n.presentational,
			expanded: n.expanded,
		})),
		getKey: node => node.id,
		getParentKey: node => node.parent,
		rootKey: null,
	});

export const getAttrId = attr => attr.slice(attr.lastIndexOf('/') + 1);
