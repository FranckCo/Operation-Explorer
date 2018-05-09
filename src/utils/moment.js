import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/min/locales';
import { getLang } from 'i18n';

const moment = extendMoment(Moment);

export const stringToDate = (string, lang) =>
	moment(string)
		.locale(lang || getLang())
		.format('L');
