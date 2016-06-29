import React from 'react'
import {translate} from '../../constants/Translate'
import {LoadingSpinner} from '../loading/LoadingSpinner'
import {Processor} from './Processor'

let ProcessorsList = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.number.isRequired,
		depositProcessors: React.PropTypes.array.isRequired,
		originPath: React.PropTypes.string.isRequired
	},

	render() {
		let isSelected = false;
		return (
			<div id="methods" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">

							<div className="col-sm-12">
								<div className="title">{translate('METHOD_SELECT_YOUR_DEPOSIT_METHOD')}</div>
							</div>
							<div className="col-sm-12">
								<div className="processors infoCol">
									<div className="row">

										{(() => {
											if (this.props.depositProcessors.length == 0) {
												return <LoadingSpinner />;
											}
										})()}

										{this.props.depositProcessors.map((data, i)=> {
											if (this.props.selectedProcessor == data.caProcessor_Id) {
												isSelected = true;
											} else {
												isSelected = false;
											}
											return <Processor key={data.caProcessor_Id} selected={isSelected} processor={data}
																				originPath={this.props.originPath}/>;
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
