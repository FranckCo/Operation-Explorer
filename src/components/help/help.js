import React, { Component } from 'react'
import MDSStructure from './msd';
import MASDetails from './mas'
import { sortArrayByKey, addSimsKeySort } from 'utils/sort-array';
import D from 'i18n';

const order = sortArrayByKey('key');

class Help extends Component {
  constructor() {
    super()
    this.state = { activeAttr: '' };
		this.changeActiveAttr = activeAttr => this.setState({ activeAttr });
  }

  render() {
    const { msdStructure } = this.props
    const { activeAttr } = this.state
    const structure = order(addSimsKeySort(msdStructure));
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3 sims-title centered">
            {D.helpTitle}
          </div>
        </div>
        <div className="row msd-container">
          <div className="col-md-4">
            <MDSStructure
              msdStructure={structure}
              changeActiveAttr={this.changeActiveAttr}
              activeMasId={activeAttr}
            />
          </div>
          {activeAttr && <div className="col-md-8">
            <MASDetails
              masId={activeAttr}
            />
          </div>}
        </div>
      </div>
    )
  }
}

export default Help
