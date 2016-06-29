import React from 'react'
import {translate} from '../../constants/Translate'
import {LoadingSpinner} from '../loading/LoadingSpinner'
import {Processor} from './Processor'

let ProcessorsList = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.number,
    processors: React.PropTypes.array,
		originPath: React.PropTypes.string,
    isWithDraw: React.PropTypes.number
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		//CashierActions.changeCurrentStep(1);
		//CashierActions.changeCurrentView(this.customerAction()+"/"+this.props.selectedProcessor.displayName.toLowerCase());
	},

	render() {
		let isSelected = false;
		return (
			<div id="methods" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
                {(() => {
                  if (!this.props.isWithDraw) {
                    return <div className="title">{translate('METHOD_SELECT_YOUR_DEPOSIT_METHOD')}</div>;
                  }else{
                    return <div className="title">{translate('METHOD_SELECT_YOUR_WITHDRAW_METHOD')}</div>;
                  }
                })()}
							</div>
							<div className="col-sm-12">
								<div className="processors infoCol">
									<div className="row">

										{(() => {
											if (this.props.processors.length == 0) {
												return <LoadingSpinner />;
											}
										})()}

										{this.props.processors.map((processor, i)=> {
											if(this.props.selectedProcessor == processor.caProcessor_Id) {
												isSelected = true;
											} else {
												isSelected = false;
											}

                      return <Processor key={processor.caProcessor_Id} selected={isSelected} processorId={processor.caProcessor_Id} displayName={processor.DisplayName} originPath={this.props.originPath}/>;
										})}

									</div>
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
