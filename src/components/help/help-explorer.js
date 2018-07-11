import React from 'react';
import msdStructure from 'components/connectors/sims-structure'
import Help from './help'
import NotFound from '../not-found';
import Spinner from 'components/shared/spinner';
import D from 'i18n';


const connector = msdStructure

const HelpContainer = ({ simsStructure }) => (
	<Help
		msdStructure={simsStructure}
	/>
);

export default connector(HelpContainer, {
	error: () => <NotFound message={D.msdNotFound} />,
	loading: () => <Spinner text={D.loadingAMsd} />,
});
