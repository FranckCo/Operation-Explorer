import React, { Component } from 'react';
import BackBtn from './back-btn';
import SimsStructure from './sims-structure';
import SimsReport from './sims-report';
import NotFound from '../not-found';
import { sortArrayByKey, addSimsKeySort } from 'utils/sort-array';
import D from 'i18n';

const order = sortArrayByKey('key');

class Sims extends Component {
	constructor() {
		super();
		this.state = { activeAttr: '' };
		this.changeActiveAttr = activeAttr => this.setState({ activeAttr });
	}
	render() {
		const { activeAttr } = this.state;
		const { simsStructure, simsReport, codes } = this.props;

		if (simsReport.length === 0) return <NotFound message={D.simsNotFound} />;

		const structure = order(addSimsKeySort(simsStructure));

		const reportTitle = simsReport.find(r => r.title).title;
		const subTitle =
			activeAttr &&
			simsStructure.find(s => s.mas.endsWith(`/${activeAttr}`)).masLabel;
		return (
			<div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3 sims-title centered">
						{reportTitle}
					</div>
				</div>
				<BackBtn target={simsReport.find(r => r.target)} />
				<div className="row sims">
					<div className="col-md-4">
						<SimsStructure
							structure={structure}
							changeActiveAttr={this.changeActiveAttr}
						/>
					</div>
					<div className="col-md-8">
						{activeAttr && (
							<SimsReport
								report={simsReport}
								activeAttr={activeAttr}
								subTitle={subTitle}
								codes={codes}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Sims;
