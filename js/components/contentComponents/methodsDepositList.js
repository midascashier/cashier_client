import React from 'react'
import {translate} from '../../constants/translate'
import {Loading} from '../loading'
import {Processor} from './processor'

let row=[];

let MethodsDepositList = React.createClass({
	render() {
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
                  {(() => {
                    if (this.props.depositProcessors.length==0) {
                      return <Loading />;
                    } else {
                      for (var i=0; i < this.props.depositProcessors.length; i++) {
                          row.push(<Processor key={this.props.depositProcessors[i].caProcessor_Id} quantity={i} processor={this.props.depositProcessors[i]}/>);
                        }
                      return (<div className="col-sm-12">{row}</div>)
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
});

module.exports.MethodsDepositList = MethodsDepositList;