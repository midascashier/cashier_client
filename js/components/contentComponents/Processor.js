import React from 'react'
import {customerService} from '../../services/CustomerService'

let Processor = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		processorId: React.PropTypes.string,
		displayName: React.PropTypes.string,
		originPath: React.PropTypes.string
	},

	/**
	 * this function dispatch an action to change current processor
	 */
	changeProcessor() {
		customerService.changeMethod(this.props.processorId);
	},

	render() {
		let isActive = "";
		if (this.props.selected) {
			isActive = "active";
		}

		return (
			<div className="col-sm-6">
				<div className={"method "+ isActive} onClick={this.changeProcessor}>
					<img src={this.props.originPath + '/images/processors/'+this.props.processorId+'.png'} alt={this.props.displayName}/>
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
