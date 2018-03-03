import React from 'react';

export const tidyString = string => (
	string && <span>{string.split(/\n/).map(s => <p>{s}</p>)}</span>
);
