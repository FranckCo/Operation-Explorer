import React from 'react';
import { stringToDate } from 'utils/moment';
import './date.css';

export default ({ date }) => <div className="date">{stringToDate(date)}</div>;
