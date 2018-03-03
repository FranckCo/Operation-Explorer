import React from 'react';

export const tidyString = string =>
	string && <span>{string.split(/\n/).map((s, i) => <p key={i}>{s}</p>)}</span>;
