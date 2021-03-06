import deburr from 'lodash/deburr';

export const sortArrayByKey = key =>
	/**
	 * Sort an array by a given key
	 *
	 * If `desc` is set to true, descending order will be used
	 *
	 * @param   {array}      arr  array of objects with the key given key
	 * @param   {boolean}    desc true if descending order required
	 * @returns {array}           the array sorted by the given key
	 */

	(arr, desc = false) => {
		const order = desc ? 1 : -1;
		return arr.sort((a, b) => {
			const aUp = deburr(a[key]).toLowerCase();
			const bUp = deburr(b[key]).toLowerCase();
			return bUp > aUp ? order : bUp === aUp ? 0 : -order;
		});
	};

export const addSimsKeySort = simsStructure =>
	simsStructure.map(s => ({
		...s,
		key: s.mas
			.slice(s.mas.lastIndexOf('/') + 3)
			.split('.')
			.map(e => (e.length === 2 ? e : `0${e}`))
			.join(''),
	}));
