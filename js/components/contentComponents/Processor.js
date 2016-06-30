import React from 'react'
import {customerService} from '../../services/CustomerService'
import {controllerUIService} from '../../services/ControllerService'

let Processor = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		processorId: React.PropTypes.string,
		displayName: React.PropTypes.string,
	},

	/**
	 * this function change current processor
	 */
	changeProcessor() {
		customerService.changeMethod(this.props.processorId);
	},

	render() {
		let isActive = "";
		let originPath = controllerUIService.getOriginPath();
		if (this.props.selected) {
			isActive = "active";
		}

		return (
			<div className="col-sm-6">
				<div className={"method "+ isActive} onClick={this.changeProcessor}>
					<img src={originPath + '/images/processors/'+this.props.processorId+'.png'} alt={this.props.displayName}/>
					{(() => {
						if (this.props.selected) {
							return <i className='fa fa-check-circle'></i>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Processor = Processor;
