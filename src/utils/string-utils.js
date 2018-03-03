import React from 'react';

export const tidyString = string => (
	<span>{string.split(/\n/).map(s => <p>{s}</p>)}</span>
);
