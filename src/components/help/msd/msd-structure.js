import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { getDataTree, getAttrId } from 'utils/tree-utils';
import 'react-sortable-tree/style.css';
import './msd-structure.css';

const updateMas = (data, mas) =>
	data.map(d => {
		if (d.id === mas) return { ...d, expanded: !d.expanded };
		else if (d.children) return { ...d, children: updateMas(d.children, mas) };
		return d;
	});

class MSDStructure extends Component {
	constructor(props) {
		super(props);
		this.state = { dataTree: getDataTree(props.msdStructure) };
		this.expandMas = mas => {
			const { dataTree } = this.state;
			this.setState({
				dataTree: updateMas(dataTree, mas),
			});
		};
	}

	render() {
		const { dataTree } = this.state;
		const { activeMasId } = this.props;
		return (
			<div style={{ width: '100%', height: '70vh' }} className="tree">
				<SortableTree
					treeData={dataTree}
					onChange={dataTree => this.setState({ dataTree })}
					canDrag={false}
					canDrop={() => false}
					generateNodeProps={rowInfo =>
							rowInfo.node.label && {
							buttons: [
								<button
									onClick={() =>
										rowInfo.node.id &&
										this.props.changeActiveAttr(getAttrId(rowInfo.node.id))
									}
									className={`masItem ${
										activeMasId && rowInfo.node.id.endsWith(activeMasId)
										&& 'masItemSelected'
									}`}
								>
									{rowInfo.node.label}
								</button>
							],
						}
					}
					theme={FileExplorerTheme}
				/>
			</div>
		);
	}
}

export default MSDStructure;
