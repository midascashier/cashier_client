import React from 'react'
import {translate} from '../../constants/translate'
import {Loading} from '../loading'
import {Processor} from './processor'

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
                    }
                  })()}

                  {this.props.depositProcessors.map((data, i)=>{
                      return <Processor key={data.caProcessor_Id} firstProcessor={firstProcessor} processor={data} originPath={this.props.originPath}/>;
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

module.exports.MethodsDepositList = MethodsDepositList;