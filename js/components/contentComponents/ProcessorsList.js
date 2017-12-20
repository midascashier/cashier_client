import React from 'react'
import { translate } from '../../constants/Translate'
import { LoadingSpinner } from '../loading/LoadingSpinner'
import { Processor } from './Processor'
import { UIService } from '../../services/UIService'
import Processors from '../../constants/Processors';

let ProcessorsList = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.number,
		processors: React.PropTypes.array
	},

	render() {
		let titleText = translate('METHOD_SELECT_YOUR_DEPOSIT_METHOD', 'Select Your Deposit Method');
		if(UIService.getIsWithDraw()){
			titleText = translate('METHOD_SELECT_YOUR_WITHDRAW_METHOD', 'Select Your Withdraw Method');
		}
		let isSelected = false;
		return (
			<div id="methods" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{titleText}</div>
						<div className="processors">
							<div className="infoCol scroll">
								{(() =>{
									if(this.props.processors.length == 0){
										return <LoadingSpinner />;
									}
								})()}

								<div id="processors" className="row">
									{this.props.processors.map((processor, i)=>{
										isSelected = (this.props.selectedProcessor == processor.caProcessor_Id);
										if (Processors.settings[processor.caProcessor_Id]){
											return (
												<Processor
													key={processor.caProcessor_Id}
													selected={isSelected}
													processorId={processor.caProcessor_Id}
													name={processor.Name}
												/>
											)
										}
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.ProcessorsList = ProcessorsList;
