import D from 'i18n';

export default list =>
	list.length > 1
		? `${list.length} ${D.results}`
		: `${list.length} ${D.result}`;
