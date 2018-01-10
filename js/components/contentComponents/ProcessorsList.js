import React from 'react'
import {Processor} from './Processor'
import {UIService} from '../../services/UIService'
import Processors from '../../constants/Processors'
import {translate} from '../../constants/Translate'
import {LoadingSpinner} from '../loading/LoadingSpinner'

let ProcessorsList = React.createClass({
    propTypes: {
        waitLimits: React.PropTypes.func,
        processors: React.PropTypes.array,
        selectedProcessor: React.PropTypes.number
    },

    render(){
        let titleText = translate('METHOD_SELECT_YOUR_DEPOSIT_METHOD', 'Select Your Deposit Method');
        if (UIService.getIsWithDraw()) {
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
                                {(() => {
                                    if (this.props.processors.length == 0) {
                                        return <LoadingSpinner />;
                                    }
                                })()}

                                <div id="processors" className="row">
                                    {this.props.processors.map((processor, i)=> {
                                        isSelected = (this.props.selectedProcessor == processor.caProcessor_Id);
                                        if (Processors.settings[processor.caProcessor_Id]) {
                                            return (
                                                <Processor
                                                    selected={isSelected}
                                                    name={processor.Name}
                                                    key={processor.caProcessor_Id}
                                                    waitLimits={this.props.waitLimits}
                                                    processorId={processor.caProcessor_Id}
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