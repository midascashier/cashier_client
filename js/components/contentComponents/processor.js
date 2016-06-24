import React from 'react'
import {CashierActions} from '../../actions/CashierActions'

let Processor = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		processor: React.PropTypes.object,
		originPath: React.PropTypes.string
	},
	/**
	 * this function dispatch an action to change current processor
	 */
	changeProcessor: function () {
		CashierActions.changeMethod({processorId: this.props.processor.caProcessor_Id});
	},

	render() {
		let isActive = "";
		if (this.props.selected) {
			isActive = "active";
		}
		return (
			<div className="col-sm-6">
				<div className={"method "+ isActive} onClick={this.changeProcessor}>
					<img src={this.props.originPath + '/images/processors/'+this.props.processor.caProcessor_Id+'.png'}
							 alt={this.props.processor.DisplayName}/>
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