import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { getDataTree, getAttrId } from 'utils/tree-utils';
import 'react-sortable-tree/style.css';
import './sims-structure.css';

const updateMas = (data, mas) =>
	data.map(d => {
		if (d.id === mas) return { ...d, expanded: !d.expanded };
		else if (d.children) return { ...d, children: updateMas(d.children, mas) };
		return d;
	});

class TreeMenu extends Component {
	constructor(props) {
		super(props);
		this.state = { dataTree: getDataTree(props.structure) };
		this.expandMas = mas => {
			const { dataTree } = this.state;
			this.setState({
				dataTree: updateMas(dataTree, mas),
			});
		};
	}

	render() {
		const { dataTree } = this.state;
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
								rowInfo.node.presentational ? (
									<button
										onClick={() => this.expandMas(rowInfo.node.id)}
										className="buttonLikeDiv"
									>
										{rowInfo.node.label}
									</button>
								) : (
									<button
										onClick={() =>
											rowInfo.node.id &&
											this.props.changeActiveAttr(getAttrId(rowInfo.node.id))
										}
										className="buttonLikeLink"
									>
										{rowInfo.node.label}
									</button>
								),
							],
						}
					}
					theme={FileExplorerTheme}
				/>
			</div>
		);
	}
}

export default TreeMenu;
