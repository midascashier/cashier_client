import React from 'react'
import { UIService } from '../../services/UIService'

let Processor = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool, processorId: React.PropTypes.string, displayName: React.PropTypes.string,
	},

	/**
	 * this function change current processor
	 */
	selectProcessor() {
		UIService.selectProcessor(this.props.processorId);
	},

	render() {
		let isActive = "";
		let originPath = UIService.getOriginPath();
		if(this.props.selected){
			isActive = "active";
		}

		return (
			<div className="col-sm-6">
				<div className={"method "+ isActive} onClick={this.selectProcessor}>
					<a href="javascript:;" className={this.props.name.toLowerCase()}></a>
					{(() =>{
						if(this.props.selected){
							return <i className='fa fa-check-circle'></i>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Processor = Processor;
